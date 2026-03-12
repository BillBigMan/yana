import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import imageminSvgo from 'imagemin-svgo';
import imageminGifsicle from 'imagemin-gifsicle';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Pour les modules ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration ultra-agressive pour 90%+ d'économie
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
  // Options de compression - Mode ULTRA-agressif
  jpegOptions: {
    quality: 20, // Ultra-basse qualité
    progressive: true,
    optimize: true
  },
  pngOptions: {
    quality: [0.05, 0.1], // Ultra-basse qualité
    speed: 1, // Plus lent mais meilleure compression
    strip: true
  },
  webpOptions: {
    quality: 20, // Ultra-basse qualité
    method: 6 // Maximum compression
  },
  gifsicleOptions: {
    optimizationLevel: 3, // Maximum
    colors: 16, // Très peu de couleurs
    interlaced: false
  },
  svgOptions: {
    plugins: ['preset-default']
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

// Fonction principale de compression agressive
async function compressImagesAggressive() {
  console.log('🔥 Démarrage de la compression ULTRA-agressive d\'images pour Y\'ana...\n');
  
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
      // Forcer la recompression JPEG/PNG
      const compressedJpegPng = await imagemin([`${inputDir}/*.{jpg,jpeg,png}`], {
        destination: inputDir,
        plugins: [
          imageminMozjpeg(config.jpegOptions),
          imageminPngquant(config.pngOptions)
        ],
        glob: {
          ignore: config.exclude.map(pattern => `${inputDir}/${pattern}`)
        }
      });

      // Conversion en WebP ultra-compressé
      const webpFiles = await imagemin([`${inputDir}/*.{jpg,jpeg,png}`], {
        destination: inputDir,
        plugins: [
          imageminWebp(config.webpOptions)
        ],
        glob: {
          ignore: config.exclude.map(pattern => `${inputDir}/${pattern}`)
        }
      });

      // Compression SVG
      const compressedSvg = await imagemin([`${inputDir}/*.svg`], {
        destination: inputDir,
        plugins: [
          imageminSvgo(config.svgOptions)
        ],
        glob: {
          ignore: config.exclude.map(pattern => `${inputDir}/${pattern}`)
        }
      });

      // Compression GIF
      const compressedGif = await imagemin([`${inputDir}/*.gif`], {
        destination: inputDir,
        plugins: [
          imageminGifsicle(config.gifsicleOptions)
        ],
        glob: {
          ignore: config.exclude.map(pattern => `${inputDir}/${pattern}`)
        }
      });

      // Conversion en WebP pour GIF
      const webpGifFiles = await imagemin([`${inputDir}/*.gif`], {
        destination: inputDir,
        plugins: [
          imageminWebp(config.webpOptions)
        ],
        glob: {
          ignore: config.exclude.map(pattern => `${inputDir}/${pattern}`)
        }
      });

      // Calcul des statistiques
      const allFiles = [...compressedJpegPng, ...webpFiles, ...compressedSvg, ...compressedGif, ...webpGifFiles];
      
      for (const file of allFiles) {
        const originalPath = path.join(inputDir, path.basename(file.sourcePath));
        const compressedPath = file.destinationPath;
        
        if (fs.existsSync(originalPath) && fs.existsSync(compressedPath)) {
          const originalSize = getFileSize(originalPath);
          const compressedSize = getFileSize(compressedPath);
          const savings = originalSize - compressedSize;
          const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
          
          totalOriginalSize += originalSize;
          totalCompressedSize += compressedSize;
          processedFiles++;
          
          console.log(`  🔥 ${path.basename(file.sourcePath)}: ${formatSize(originalSize)} → ${formatSize(compressedSize)} (${savingsPercent}% d'économie)`);
        }
      }

      // Affichage des WebP créés
      if (webpFiles.length > 0) {
        console.log(`  🌐 Création de ${webpFiles.length} fichiers WebP (JPEG/PNG)`);
      }
      
      if (webpGifFiles.length > 0) {
        console.log(`  🌐 Création de ${webpGifFiles.length} fichiers WebP (GIF)`);
      }

    } catch (error) {
      console.error(`❌ Erreur lors du traitement de ${inputDir}:`, error.message);
    }
  }

  // Statistiques finales
  const totalSavings = totalOriginalSize - totalCompressedSize;
  const totalSavingsPercent = totalOriginalSize > 0 ? ((totalSavings / totalOriginalSize) * 100).toFixed(1) : 0;

  console.log('\n📊 Statistiques de compression ULTRA-agressive:');
  console.log(`  📁 Fichiers traités: ${processedFiles}`);
  console.log(`  📏 Taille originale: ${formatSize(totalOriginalSize)}`);
  console.log(`  📏 Taille compressée: ${formatSize(totalCompressedSize)}`);
  console.log(`  💾 Espace économisé: ${formatSize(totalSavings)} (${totalSavingsPercent}%)`);
  
  if (totalSavingsPercent >= 90) {
    console.log('\n🎉 Objectif atteint ! Compression ULTRA-agressive réussie avec 90%+ d\'économie !');
  } else if (totalSavingsPercent >= 70) {
    console.log('\n✅ Excellente compression ! Proche des 90% d\'économie.');
  } else if (totalSavingsPercent >= 50) {
    console.log('\n👍 Bonne compression ! Plus de 50% d\'économie.');
  } else {
    console.log('\n⚠️ Compression modérée. Les images sont peut-être déjà optimisées.');
  }
}

// Exécuter la compression agressive
compressImagesAggressive().catch(error => {
  console.error('❌ Erreur lors de la compression agressive:', error);
  process.exit(1);
});
