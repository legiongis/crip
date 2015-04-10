
--Populate associative relationships between contexts and eligibility 
insert into concepts.relations (conceptidfrom, conceptidto, relationtype)
select 
a.conceptid as conceptidfrom,
b.conceptid as conceptidto,
'mappingRelation' as reltationtype
FROM 
(select 
conceptid,
value
from concepts.values
where 1=1
and valuetype = 'ctpValue') a
  JOIN
	(select 
	conceptid,
	value
	from concepts.values
	where 1=1
	and valuetype = 'eligCtpValue') b
  ON a.value = b.value	
GROUP BY
a.conceptid ,
b.conceptid;

--delete records from the values table that were only inserted in the first place to enable the statement above
	DELETE from concepts.values
	where 1=1
	and valuetype = 'ctpValue';

	DELETE from concepts.values
		where 1=1
		and valuetype = 'eligCtpValue';