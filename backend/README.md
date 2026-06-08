# Backend Setup

This backend supports either MongoDB Atlas or a local MongoDB instance.

## Using Atlas
1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI` to your Atlas connection string.
3. Make sure your current IP is whitelisted in MongoDB Atlas.

## Using Local MongoDB
1. Install MongoDB locally or run it in Docker:
   ```powershell
   docker run --name vogue-mongo -p 27017:27017 -d mongo:latest
   ```
2. Copy `.env.example` to `.env`.
3. Uncomment the local URI and save:
   ```text
   MONGO_URI=mongodb://127.0.0.1:27017/vogue_plaza
   ```
4. Start the backend:
   ```powershell
   npm run dev
   ```

## Notes
- The backend config falls back to a local URI if `MONGO_URI` is not set.
- If `MONGO_URI` points to Atlas and your IP is not whitelisted, the backend will still fail to connect.

## Windows helper script
From the project root, run:
```powershell
start-mern-dev.bat
```
This script:
- creates `C:\data\db` if needed
- starts `mongod` in a new terminal window
- then runs `npm run dev` for the MERN app
