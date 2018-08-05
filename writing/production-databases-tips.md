---
date: 2018-08-05
summary: The goal here is get what you need done as quickly as possible and keep rolling. "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough." - Mark Zuckerberg. 1. Connect to your production databases using the same tool you use for development. There's no need to...
tags:
  - database
  - database-adminstration
  - dba
  - production
  - productivity
  - development
  - mysql
  - mssql
  - postgres
  - rockstar
  - satire
---

## 10 pro tips: how to work with production databases

The goal here is get what *you* need done as quickly as possible and keep rolling.

::: quote Mark Zuckerberg
Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.
:::

1. Use the same tool you use for development to connect to your production databases. There's no need to learn more than one tool for the same job. Context-switching is for chumps. 
1. Connect to all of the databases and keep the connections open all the time. It should be really easy to jump between databases, and from development to production.
1. Query using a user which has full privileges. Come on, we're grown-ups here.
1. Run queries in bulk where possible.
1. Don't group databases in folders. Aim to reduce clicks rather than introduce them. On a related note, if you use keyboard shortcuts you don't need to worry about UI or to look at what you're doing at all really.
1. Don't waste time with labelling or colouring your connections. Customers don't care how pretty your setup is. Strive for absolute consistency.
1. If your tool has a "safe mode", forget about it. It will only hold you back. Productivity beats safety every time.
1. Always browse primaries, unless you have a legitimate reason to use a replica. You might run an update on the wrong database and impact fewer databases than expected. 
1. Snapshots / backups are for the weak.
1. Only use `WHERE` clauses when necessary. Database browsers tend to limit how many rows are returned anyway. Adding a `WHERE` clause yourself might unnecessarily slow down your query.

Bam! Rockstar database administration isn't a skill, it's a mindset.
