import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const competencyId = req.nextUrl.searchParams.get('competencyId');
  if (!competencyId) {
    return NextResponse.json({ error: 'competencyId é obrigatório' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'dump', 'db', 'mongo', 'questions.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const questions = JSON.parse(fileContents);
    const filtered = questions.filter((q: any) => String(q.competency_id) === String(competencyId));
    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao ler arquivo de questões', details: String(error) }, { status: 500 });
  }
} 