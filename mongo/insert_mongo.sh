cat $1 | tr "|" "," | sed -e "s,\\x02.*,,g" | mongoimport -u aladin -p aladin -h mongo02t.bbo1t.local:27028 -db perfAladinDB -c recherches --fieldFile header.csv --type csv 
