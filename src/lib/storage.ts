import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const MAX_SIZE = 25 * 1024 * 1024;

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return false;
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
  return true;
}

export async function storeFile(file: File) {
  if (!file.size || file.size > MAX_SIZE) throw new Error("File must be between 1 byte and 25 MB");
  const bytes = Buffer.from(await file.arrayBuffer());
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
  const key = `${randomUUID()}-${cleanName}`;

  if (configureCloudinary()) {
    const uploaded = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "mr-sahil-it/orders", type: "upload" },
        (error, result) => error || !result ? reject(error ?? new Error("Upload failed")) : resolve(result),
      );
      stream.end(bytes);
    });
    return { storageKey: uploaded.public_id, remoteUrl: uploaded.secure_url, size: bytes.length };
  }

  const directory = path.join(process.cwd(), ".data", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, key), bytes);
  return { storageKey: key, remoteUrl: null, size: bytes.length };
}

export async function loadLocalFile(storageKey: string) {
  if (storageKey.includes("/") || storageKey.includes("..")) throw new Error("Invalid storage key");
  return readFile(path.join(process.cwd(), ".data", "uploads", storageKey));
}
