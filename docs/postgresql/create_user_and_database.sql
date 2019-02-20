\set database_name 'tutors_backend_db'
\set user_name 'tutors_backend'
\set user_password '<POSTGRES PASSWORD>'

CREATE DATABASE :database_name; 
CREATE USER :user_name WITH PASSWORD :'user_password';
ALTER ROLE :user_name SET client_encoding TO 'utf8'; 
ALTER ROLE :user_name SET default_transaction_isolation TO 'read committed'; 
ALTER ROLE :user_name SET timezone TO 'UTC'; 
ALTER USER :user_name CREATEDB; 
GRANT ALL PRIVILEGES ON DATABASE :database_name TO :user_name;
