import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/**/index.ts',
    'src/components/*.tsx',
  ],
  format: ['cjs', 'esm'], // Genera archivos para Node antiguo y moderno
  dts: true,             // Genera los archivos de tipos (.d.ts) automáticamente
  clean: true,           // Limpia la carpeta dist antes de cada build
  minify: true,          // Minimiza el código para que pese menos
  external: ['react', 'react-dom'], // No incluye React dentro del paquete
  sourcemap: true,
  splitting: true,
  treeshake: true,
  bundle: true,
});