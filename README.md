# Next Notion Blog

⚠️ If you want something robust that's working, go with [samuelkraft/notion-blog-nextjs](https://github.com/samuelkraft/notion-blog-nextjs), this is just my playground.

It should be possible to run a blog off of Notion. Heavily work in progress, build with Next.js and the Notion API.

[👨‍💻 DEMO](https://next-notion-blog-ashen.vercel.app/)

## Setup

### Prerequisites

- Node.js 18+
- A [Notion](https://notion.so) account

### 1. Clone and install

```bash
git clone https://github.com/your-username/next-notion-blog.git
cd next-notion-blog
npm install
```

### 2. Create a Notion integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) and click **New integration**
2. Give it a name, select your workspace, and submit
3. Copy the **Internal Integration Token** — this is your `NOTION_AUTH` value

### 3. Set up your Notion database

Create a Notion database (full page, not inline) with these properties:

| Property name   | Type      | Purpose                                  |
| --------------- | --------- | ---------------------------------------- |
| `Name`          | Title     | Post title (built-in, already exists)    |
| `url`           | Text      | URL slug used for routing (e.g. `my-post`) |
| `published_time`| Date      | Publication date, used for sorting       |

Only pages with a non-empty `url` property are shown in the listing.

**Share the database with your integration:** open the database, click the `...` menu → **Add connections** → select your integration.

**Get the database ID** from the URL when the database is open as a full page:
```
https://notion.so/yourworkspace/<DATABASE_ID>?v=...
```
The database ID is the 32-character string before the `?`.

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your values:

```
NOTION_AUTH=secret_xxxx   # integration token from step 2
DB_ID=xxxx                # database ID from step 3
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Currently Supports
- Lists of pages, sorted by date, displayed based on a tag
- Simple paragraphs with all styles
- All headlines (with styles)
- Lists (rendered as valid HTML, as notion only send single items)
- Inline code blocks
- Quotes
- Images with captions

## Examples
<img width="1117" alt="image" src="https://user-images.githubusercontent.com/3950661/215288863-bce57990-d3e9-4213-b29e-6ef2c006e932.png">
<img width="1117" alt="image" src="https://user-images.githubusercontent.com/3950661/215288877-644eb192-927b-4c61-bb76-d7f986b3257e.png">

