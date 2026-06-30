# Database Backup Strategy

## Daily Backup
- Backup database every day.
- Store backups in backups/daily folder.
- Keep backups for 7 days.

## Weekly Backup
- Full backup every Sunday.
- Store backups in backups/weekly folder.
- Keep backups for 4 weeks.

## Restore Process
1. Stop application.
2. Restore database using mongorestore.
3. Verify data.
4. Restart application.