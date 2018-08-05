---
date: 2018-08-05
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

## How the pros work with production databases

:::summary

The goal here is get what you need to get done as quickly as possible and keep rolling.

:::

::: quote Mark Zuckerberg
Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.
:::

1. Connect to your production databases using the same tool you use for development. There's no need to learn more than one tool for the same job. Context-switching is for chumps. 
1. Connect to all of the databases and keep the connections open all the time.
1. Connect using a user which has full privileges. Come on, we're grown-ups here.
1. Run queries in bulk where possible.
1. Don't group databases in folders or anything like that. We need to reduce clicks, not introduce them. On a related note, use keyboard shortcuts.
1. Don't waste time with labelling or colours. Strive for absolute consistency. Customers don't care how pretty your setup is.
1. If your tool has a "safe mode", forget about it. It will only hold you back. Productivity beats safety every time.
1. Query or browse primaries unless you legitimately need to use a replica. There's nothing worse than running a query on the wrong database and having absolutely NOTHING happen as a result.  
1. Snapshots / backups are for the weak.
1. Only use `WHERE` clauses where necessary. Database browsers tend to limit how many rows are returned anyway. Adding a `WHERE` clause yourself might unnecessarily slow down your query.

Bam! Rockstar database administration isn't a skill, it's a mindset.
