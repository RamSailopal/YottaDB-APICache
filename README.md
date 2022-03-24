# YottaDB-APICache

![Alt text](yottadb-cache.webp?raw=true "gitpod View")

A demonstration of using YottaDB as an API cache in a similar way to the way Redis is used

Redis in an in memory key value data store where as YottaDB is an on disk key value store. The speed of RAM against disk would therefore make Redis more performant but the native speed of YottaDB and the lower cost of disk space would make YottaDB beneficial none the less

Three external endpoints are used of for testing with varying payloads:

https://www.reddit.com/r/Wallstreetbets/top.json?limit=10000&t=year - 10000 records

https://jsonplaceholder.typicode.com/photos - 5000 records

https://jsonplaceholder.typicode.com/comments - 500 records

# Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/RamSailopal/YottaDB-APICache)

Get a free gitpod account at https://gitpod.io and then click on the Gitpod button above to provision in Gitpod

# On Prem with docker-compose

    git clone https://github.com/RamSailopal/YottaDB-APICache.git
    cd YottaDB-APICache/Docker
    docker-compose up
    
# Testing with Postman

The following endpoints will first call the external api's (referenced above) and create a cache within YottaDB. All subsequent calls will use the cache up until a period a 30 seconds when the cache is cleared.

   http://dockerserveraddress:4000/photos or https://4000-gitpodserveraddress/photos
   
   http://dockerserveraddress:4000/comments or https://4000-gitpodserveraddress/comments
   
   http://dockerserveraddress:4000/reddit or https://4000-gitpodserveraddress/reddit
   
 The M routine **yottacache** - https://raw.githubusercontent.com/RamSailopal/YottaDB-APICache/main/yottadb/yottacache.m is used to create and clear the cache and **Rob Tweed's** **mg-dbx** used to write and read from YottaDB as well as calling the yottacache M functions

# References

**mg-dbx** - https://www.npmjs.com/package/mg-dbx
