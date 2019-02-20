# PostgreSQL installation and configuration

## Installation
```bash
sudo apt-get install postgresql
```

## Service autostart enabling
```bash
sudo systemctl enable postgresql
```

## Configuration

An PL/SQL script is written to automatically configure the database. The only thing you need to start working with it is setting some varibles in a start of the file __*create_user_and_database.sql*__.

Just replace values in the bottom with yours:
```sql
\set database_name '<POSTGRES DB>'
\set user_name '<POSTGRES USER>'
\set user_password '<POSTGRES PASSWORD>'
```

Then use the following command to configure PostgreSQL:
```bash
sudo -u postgres psql -f create_user_and_database.sql
```
