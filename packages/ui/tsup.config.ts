import { defineConfig } from 'tsup';

export default defineConfig({
entryPoints: {
    index: 'src/index.ts',
    'Button/index': 'src/components/Button/index.ts',
    'Checkbox/index': 'src/components/Checkbox/index.ts',
  },
  outDir: 'kyd',
  format: ['cjs', 'esm'], // Genera archivos para Node antiguo y moderno
  dts: true,             // Genera los archivos de tipos (.d.ts) automáticamente
  clean: true,           // Limpia la carpeta dist antes de cada build
  minify: true,          // Minimiza el código para que pese menos
  external: ['react', 'react-dom'], // No incluye React dentro del paquete
  sourcemap: true,
  splitting: true,
  treeshake: true,
  bundle: true,
  injectStyle: true,
});