import arches_hip.setup as setup
from arches.app.models.resource import Resource
from django.contrib.auth.models import User, Permission, ContentType, Group
from django.conf import settings

def install(path_to_source_data_dir=None):
    setup.truncate_db()
    setup.delete_index(index='concept_labels')
    setup.delete_index(index='term') 
    Resource().prepare_term_index(create=True)
    setup.load_resource_graphs()
    setup.load_authority_files(path_to_source_data_dir)
    setup.load_map_layers()
    build_groups()
    setup.resource_remover.truncate_resources()
    setup.delete_index(index='resource')
    setup.delete_index(index='entity')
    setup.delete_index(index='maplayers')
    setup.delete_index(index='resource_relations') 
    create_indices()
    setup.load_resources()

def load_resource_graphs():
    setup.resource_graphs.load_graphs(break_on_error=True)

def load_authority_files(path_to_files=None):
    setup.authority_files.load_authority_files(path_to_files, break_on_error=True)

def load_resources(external_file=None):
    setup.load_resources(external_file)
    
def create_indices():
    Resource().prepare_resource_relations_index(create=True)
    
    for res_config in settings.RESOURCE_TYPE_CONFIGS().values():
        Resource().prepare_search_index(res_config['resourcetypeid'], create=True)
    
def build_groups():
    '''builds all default AFRH-specific permissions, groups, and users'''
    
    print "\nREMOVING ARCHES-HIP PERMISSIONS & GROUPS\n-----------------------"
    all_perms = Permission.objects.filter()
    for p in all_perms:
        p.delete()
    print "  {} permissions removed".format(len(all_perms))
    
    all_groups = Group.objects.filter()
    for g in all_groups:
        g.delete()
    print "  {} groups removed".format(len(all_groups))
    
    print "\nCREATING GROUPS\n-----------------------"
    
    print "  creating groups...\n\n",
    Group.objects.get_or_create(name='RDM ACCESS')[0],
    Group.objects.get_or_create(name='DATA CREATORS')[0],
        
    for res in settings.RESOURCE_TYPE_CONFIGS().values():
        Group.objects.get_or_create(name=res['name'])