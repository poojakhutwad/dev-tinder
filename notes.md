-Why do we need index in DB?
-What is the advantages and disadvantages of creating index?
-Read this article of compound indexes => https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
-$or & $and query in mongodb => https://www.mongodb.com/docs/manual/reference/mql/query-predicates/logical/
-schema.pre("save") function
-read about ref and populate


-NOTES: Pagination on feed api
/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

/feed?page=3&limit=10 => 1-10 => .skip(20) & .limit(10)

/feed?page=4&limit=10 => 1-10 => .skip(30) & .limit(10)

formula for skip is 
skip = (page-1)*limit