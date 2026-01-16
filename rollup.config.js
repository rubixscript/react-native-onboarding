import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
    ],
    external: ['react', 'react-native', 'expo', 'react-native-reanimated', '@react-native-async-storage/async-storage', 'expo-linear-gradient', 'expo-blur', '@expo/vector-icons'],
  },
  {
    input: 'src/components/index.ts',
    output: [
      {
        file: 'dist/components.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/components.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
    ],
    external: ['react', 'react-native', 'expo', 'react-native-reanimated', '@react-native-async-storage/async-storage', 'expo-linear-gradient', 'expo-blur', '@expo/vector-icons'],
  },
  {
    input: 'src/slides/index.ts',
    output: [
      {
        file: 'dist/slides.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/slides.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
    ],
    external: ['react', 'react-native', 'expo', 'react-native-reanimated', '@react-native-async-storage/async-storage', 'expo-linear-gradient', 'expo-blur', '@expo/vector-icons'],
  },
  {
    input: 'src/presets/index.ts',
    output: [
      {
        file: 'dist/presets.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/presets.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
    ],
    external: ['react', 'react-native', 'expo', 'react-native-reanimated', '@react-native-async-storage/async-storage', 'expo-linear-gradient', 'expo-blur', '@expo/vector-icons'],
  },
  {
    input: 'src/themes/index.ts',
    output: [
      {
        file: 'dist/themes.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/themes.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
    ],
    external: ['react', 'react-native', 'expo', 'react-native-reanimated', '@react-native-async-storage/async-storage', 'expo-linear-gradient', 'expo-blur', '@expo/vector-icons'],
  },
  {
    input: 'src/types/index.ts',
    output: [
      {
        file: 'dist/types.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/types.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
    ],
    external: ['react', 'react-native', 'expo', 'react-native-reanimated', '@react-native-async-storage/async-storage', 'expo-linear-gradient', 'expo-blur', '@expo/vector-icons'],
  },
];
