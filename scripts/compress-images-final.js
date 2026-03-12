import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import imageminSvgo from 'imagemin-svgo';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Pour les modules ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration FINALE pour 90%+ d'économie
const config = {
  // Répertoires à compresser
  inputDirs: [
    'public/assets',
    'src/assets',
    'public'
  ],
  // Fichiers à exclure
  exclude: [
    'node_modules',
    'out',
    '.next',
    '*.ico'
  ],
  // Options de compression - Mode FINAL RADICAL
  jpegOptions: {
    quality: 5, // Qualité extrêmement basse
    progressive: true,
    optimize: true
  },
  pngOptions: {
    quality: [0.01, 0.02], // Qualité extrêmement basse
    speed: 1,
    strip: true
  },
  webpOptions: {
    quality: 5, // Qualité extrêmement basse
    method: 6 // Maximum compression
  },
  svgOptions: {
    plugins: ['preset-default']
  },
  // Redimensionnement RADICAL pour économie maximale
  resizeOptions: {
    hero: { width: 400, height: 300 }, // Radicalement réduit
    logo: { width: 100, height: 100 }, // Très petit
    default: { width: 200, height: 150 } // Très petit
  }
};

// Fonction pour obtenir la taille d'un fichier
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Fonction pour formater la taille
function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Fonction pour créer une version miniature extrêmement compressée
async function createUltraCompressedVersion(inputPath, outputPath, resizeOptions) {
  try {
    await sharp(inputPath)
      .resize(resizeOptions.width, resizeOptions.height, { 
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 5, progressive: true }) // Forcer JPEG même pour PNG
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la création ultra-compressée de ${inputPath}:`, error.message);
    return false;
  }
}

// Fonction pour déterminer les options de redimensionnement
function getResizeOptions(filename) {
  const name = filename.toLowerCase();
  if (name.includes('hero')) {
    return config.resizeOptions.hero;
  } else if (name.includes('logo')) {
    return config.resizeOptions.logo;
  }
  return config.resizeOptions.default;
}

// Fonction principale de compression FINALE RADICALE
async function compressImagesFinal() {
  console.log('⚡ Démarrage de la compression FINALE RADICALE d\'images pour Y\'ana...\n');
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let processedFiles = 0;

  for (const inputDir of config.inputDirs) {
    if (!fs.existsSync(inputDir)) {
      console.log(`⚠️  Le répertoire ${inputDir} n'existe pas, skip...`);
      continue;
    }

    console.log(`📁 Traitement du répertoire: ${inputDir}`);
    
    try {
      // Lister tous les fichiers image
      const imageFiles = fs.readdirSync(inputDir).filter(file => 
        /\.(jpg|jpeg|png|gif|svg)$/i.test(file) && !file.includes('.webp')
      );

      for (const filename of imageFiles) {
        const inputPath = path.join(inputDir, filename);
        const ext = path.extname(filename).toLowerCase();
        const baseName = path.basename(filename, ext);
        
        try {
          const originalSize = getFileSize(inputPath);
          totalOriginalSize += originalSize;

          let compressedSize = 0;

          // Étape 1: Créer une version ultra-compressée
          if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
            const resizeOptions = getResizeOptions(filename);
            const ultraCompressedPath = path.join(inputDir, `${baseName}_ultra.jpg`);
            
            const success = await createUltraCompressedVersion(inputPath, ultraCompressedPath, resizeOptions);
            if (success) {
              // Remplacer l'original par la version ultra-compressée
              fs.copyFileSync(ultraCompressedPath, inputPath);
              fs.unlinkSync(ultraCompressedPath);
              compressedSize = getFileSize(inputPath);
            }
          } else if (ext === '.svg') {
            // Compression SVG radicale
            const compressedFiles = await imagemin([inputPath], {
              destination: inputDir,
              plugins: [imageminSvgo(config.svgOptions)]
            });

            if (compressedFiles.length > 0) {
              fs.copyFileSync(compressedFiles[0].destinationPath, inputPath);
              fs.unlinkSync(compressedFiles[0].destinationPath);
              compressedSize = getFileSize(inputPath);
            }
          }

          // Étape 2: Créer WebP ultra-compressé
          if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
            const webpFiles = await imagemin([inputPath], {
              destination: inputDir,
              plugins: [imageminWebp(config.webpOptions)]
            });

            if (webpFiles.length > 0) {
              console.log(`  🌐 WebP ultra-compressé créé: ${baseName}.webp`);
            }
          }

          if (compressedSize > 0) {
            totalCompressedSize += compressedSize;
            processedFiles++;
            const savings = originalSize - compressedSize;
            const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
            
            console.log(`  ⚡ ${filename}: ${formatSize(originalSize)} → ${formatSize(compressedSize)} (${savingsPercent}% d'économie)`);
          }

        } catch (error) {
          console.error(`❌ Erreur lors du traitement de ${filename}:`, error.message);
        }
      }

    } catch (error) {
      console.error(`❌ Erreur lors du traitement de ${inputDir}:`, error.message);
    }
  }

  // Statistiques finales
  const totalSavings = totalOriginalSize - totalCompressedSize;
  const totalSavingsPercent = totalOriginalSize > 0 ? ((totalSavings / totalOriginalSize) * 100).toFixed(1) : 0;

  console.log('\n⚡ Statistiques de compression FINALE RADICALE:');
  console.log(`  📁 Fichiers traités: ${processedFiles}`);
  console.log(`  📏 Taille originale: ${formatSize(totalOriginalSize)}`);
  console.log(`  📏 Taille compressée: ${formatSize(totalCompressedSize)}`);
  console.log(`  💾 Espace économisé: ${formatSize(totalSavings)} (${totalSavingsPercent}%)`);
  
  if (totalSavingsPercent >= 90) {
    console.log('\n🎯 OBJECTIF ATTEINT ! Compression FINALE réussie avec 90%+ d\'économie !');
    console.log('⚠️  ATTENTION: Les images sont maintenant de très basse qualité.');
    console.log('📱 Idéal pour mobile et chargement ultra-rapide.');
  } else if (totalSavingsPercent >= 70) {
    console.log('\n🔥 EXCELLENT ! Compression FINALE avec 70%+ d\'économie !');
  } else if (totalSavingsPercent >= 50) {
    console.log('\n💪 BONNE ! Compression FINALE avec 50%+ d\'économie !');
  } else {
    console.log('\n⚠️ Compression limitée. Les images sont déjà très optimisées.');
  }
}

// Exécuter la compression finale
compressImagesFinal().catch(error => {
  console.error('❌ Erreur lors de la compression finale:', error);
  process.exit(1);
});
