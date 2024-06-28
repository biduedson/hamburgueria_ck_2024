import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<Response> {
  try {
    // Obtém os dados do formulário da requisição
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;

    // Verifica se o arquivo de imagem foi carregado
    if (!imageFile) {
      return NextResponse.json('Imagem não carregada.', { status: 400 });
    }

    // Converte o conteúdo do arquivo em um buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Define o diretório de upload e o nome do arquivo
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filename = `${uuidv4()}_${imageFile.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(uploadDir, filename);

    // Tenta criar o diretório de upload se não existir
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error("Erro ao criar diretório: ", error);
      return NextResponse.json({ message: 'Erro ao criar diretório.', status: 500 });
    }

    // Salva o arquivo no diretório de upload
    await writeFile(filePath, buffer);

    // Retorna a URL da imagem carregada
    const imageUrl = `/uploads/${filename}`;
    return NextResponse.json({ message: "Success", status: 201, imageUrl });
  } catch (error) {
    console.error("Error occurred: ", error);
    return NextResponse.json({ message: "Failed" + error, status: 500 });
  }
}