# Inherit image from an image containing Debian (Linux) + MySQL:
FROM mysql:5.7

# Copy SQL script into the special folder for initial installation of our database: 
COPY ./vacations-site.sql /docker-entrypoint-initdb.d

