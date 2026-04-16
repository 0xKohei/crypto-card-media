import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD ?? "admin2026";
  return authHeader === `Bearer ${password}`;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const paths = ["/", "/cards", "/top-picks/overall"];
  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({ ok: true, revalidated: paths });
}
