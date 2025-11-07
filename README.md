# Music Form App (Vercel-ready)

Deploy steps:
1. Create a GitHub repo and upload these files at the repo root.
2. In MongoDB Atlas create a cluster, a database user, and allow network access.
3. Get the connection string from Atlas and add `/music` after the host, e.g.:
   `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/music?retryWrites=true&w=majority`
4. On Vercel: Import the GitHub repo and add an Environment Variable:
   - Key: `MONGO_URI`
   - Value: your connection string
5. Deploy. After deploy:
   - Open `https://<your-project>.vercel.app` and use the form.
   - Click **Load Data** to fetch saved entries from MongoDB.
