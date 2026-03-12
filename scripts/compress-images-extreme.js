import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import imageminSvgo from 'imagemin-svgo';
import imageminGifsicle from 'imagemin-gifsicle';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Pour les modules ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration EXTREME pour 90%+ d'économie
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
  // Options de compression - Mode EXTREME
  jpegOptions: {
    quality: 10, // Qualité extrêmement basse
    progressive: true,
    optimize: true
  },
  pngOptions: {
    quality: [0.01, 0.05], // Qualité extrêmement basse
    speed: 1,
    strip: true
  },
  webpOptions: {
    quality: 10, // Qualité extrêmement basse
    method: 6 // Maximum compression
  },
  gifsicleOptions: {
    optimizationLevel: 3, // Maximum
    colors: 8, // Minimum de couleurs
    interlaced: false
  },
  svgOptions: {
    plugins: ['preset-default']
  },
  // Redimensionnement pour économie maximale
  resizeOptions: {
    hero: { width: 800, height: 600 }, // Réduire hero
    logo: { width: 200, height: 200 }, // Réduire logos
    default: { width: 400, height: 300 } // Réduire autres
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

// Fonction pour redimensionner une image
async function resizeImage(inputPath, outputPath, resizeOptions) {
  try {
    await sharp(inputPath)
      .resize(resizeOptions.width, resizeOptions.height, { 
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`Erreur lors du redimensionnement de ${inputPath}:`, error.message);
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

// Fonction principale de compression EXTREME
async function compressImagesExtreme() {
  console.log('💀 Démarrage de la compression EXTREME d\'images pour Y\'ana...\n');
  
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
        /\.(jpg|jpeg|png|gif|svg)$/i.test(file)
      );

      for (const filename of imageFiles) {
        const inputPath = path.join(inputDir, filename);
        const ext = path.extname(filename).toLowerCase();
        const baseName = path.basename(filename, ext);
        
        // Ignorer les fichiers déjà compressés
        if (filename.includes('.webp')) continue;

        try {
          const originalSize = getFileSize(inputPath);
          totalOriginalSize += originalSize;

          let compressedSize = 0;
          let compressedPath = '';

          // Étape 1: Redimensionner si c'est une image bitmap
          if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
            const resizeOptions = getResizeOptions(filename);
            const resizedPath = path.join(inputDir, `${baseName}_resized${ext}`);
            
            const resizeSuccess = await resizeImage(inputPath, resizedPath, resizeOptions);
            if (resizeSuccess) {
              // Étape 2: Compresser l'image redimensionnée
              const compressedFiles = await imagemin([resizedPath], {
                destination: inputDir,
                plugins: ext === '.png' ? 
                  [imageminPngquant(config.pngOptions)] :
                  [imageminMozjpeg(config.jpegOptions)]
              });

              if (compressedFiles.length > 0) {
                // Remplacer l'original par le compressé
                fs.copyFileSync(compressedFiles[0].destinationPath, inputPath);
                // Nettoyer les fichiers temporaires
                if (fs.existsSync(resizedPath)) {
                  fs.unlinkSync(resizedPath);
                }
                if (fs.existsSync(compressedFiles[0].destinationPath)) {
                  fs.unlinkSync(compressedFiles[0].destinationPath);
                }
                compressedSize = getFileSize(inputPath);
              }
            } else {
              // Si le redimensionnement échoue, compresser directement
              const compressedFiles = await imagemin([inputPath], {
                destination: inputDir,
                plugins: ext === '.png' ? 
                  [imageminPngquant(config.pngOptions)] :
                  [imageminMozjpeg(config.jpegOptions)]
              });

              if (compressedFiles.length > 0) {
                fs.copyFileSync(compressedFiles[0].destinationPath, inputPath);
                if (fs.existsSync(compressedFiles[0].destinationPath)) {
                  fs.unlinkSync(compressedFiles[0].destinationPath);
                }
                compressedSize = getFileSize(inputPath);
              }
            }
          } else if (ext === '.svg') {
            // Compression SVG
            const compressedFiles = await imagemin([inputPath], {
              destination: inputDir,
              plugins: [imageminSvgo(config.svgOptions)]
            });

            if (compressedFiles.length > 0) {
              fs.copyFileSync(compressedFiles[0].destinationPath, inputPath);
              if (fs.existsSync(compressedFiles[0].destinationPath)) {
                fs.unlinkSync(compressedFiles[0].destinationPath);
              }
              compressedSize = getFileSize(inputPath);
            }
          }

          // Étape 3: Créer WebP ultra-compressé
          if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
            const webpFiles = await imagemin([inputPath], {
              destination: inputDir,
              plugins: [imageminWebp(config.webpOptions)]
            });

            if (webpFiles.length > 0) {
              console.log(`  🌐 WebP créé: ${baseName}.webp`);
            }
          }

          if (compressedSize > 0) {
            totalCompressedSize += compressedSize;
            processedFiles++;
            const savings = originalSize - compressedSize;
            const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
            
            console.log(`  💀 ${filename}: ${formatSize(originalSize)} → ${formatSize(compressedSize)} (${savingsPercent}% d'économie)`);
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

  console.log('\n💀 Statistiques de compression EXTREME:');
  console.log(`  📁 Fichiers traités: ${processedFiles}`);
  console.log(`  📏 Taille originale: ${formatSize(totalOriginalSize)}`);
  console.log(`  📏 Taille compressée: ${formatSize(totalCompressedSize)}`);
  console.log(`  💾 Espace économisé: ${formatSize(totalSavings)} (${totalSavingsPercent}%)`);
  
  if (totalSavingsPercent >= 90) {
    console.log('\n🎉 OBJECTIF ATTEINT ! Compression EXTREME réussie avec 90%+ d\'économie !');
    console.log('⚠️  Attention: La qualité des images est très basse.');
  } else if (totalSavingsPercent >= 70) {
    console.log('\n🔥 EXCELLENT ! Compression EXTREME avec 70%+ d\'économie !');
  } else if (totalSavingsPercent >= 50) {
    console.log('\n💪 BONNE ! Compression EXTREME avec 50%+ d\'économie !');
  } else {
    console.log('\n⚠️ Compression limitée. Les images sont déjà très optimisées.');
  }
}

// Exécuter la compression extrême
compressImagesExtreme().catch(error => {
  console.error('❌ Erreur lors de la compression extrême:', error);
  process.exit(1);
});
