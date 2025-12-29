#!/bin/sh

# TOKEN=$1
# ./setup.sh: line 11: $'\342\200\213': command not found something with https://stackoverflow.com/questions/47434802/error-stray-342-stray-200-stray-213-in-c-compiling
# TOKEN=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2I3ZjY1MmIxZTU3NDZkNDVkZmY4OSIsIm5hbWUiOiJKZW5zIiwiZW1haWwiOiJqZW5zLnJvdHRpZXJzQHNjYXJsZXQuY29tIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWVsZm90by5wbmciLCJpYXQiOjE2MTQ1MTE5ODIsImV4cCI6MTY0NjA2ODkwOH0.xuECUw6wghrChUVkJlOwa6AfjCg9tmAcmnFADDFamM4
LINK=http://localhost:3001/api/v1/seeder/profiles

# if [ $# -eq 0 ]
#   then
#     echo "No argument supplied."
# fi
​
curl $LINK -v -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2I3ZjY1MmIxZTU3NDZkNDVkZmY4OSIsIm5hbWUiOiJKZW5zIiwiZW1haWwiOiJqZW5zLnJvdHRpZXJzQHNjYXJsZXQuY29tIiwicHJvZmlsZVBpY3R1cmUiOiJwcm9maWVsZm90by5wbmciLCJpYXQiOjE2MTQ1MTE5ODIsImV4cCI6MTY0NjA2ODkwOH0.xuECUw6wghrChUVkJlOwa6AfjCg9tmAcmnFADDFamM4" 

echo "Seeding database..."