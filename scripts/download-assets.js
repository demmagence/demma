/* eslint-disable */
const fs = require('fs');
const path = require('path');
const https = require('https');

const assets = [
  {
    name: 'logo.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdMNbt_u0AVGH2oMRl1yYIwV54aiK2XINRahjMOVIFi--j4N6tJhpDYFQ9ar8hAMsylNP8DhF5chrs4IbHesCzUedb1Nq9ivwyJlO758P8KEuCUBkBgPsgPpKJKy39wulH4SjtSlRRUgiNSVE7gNm9goag9llB8Eic0aJJDWNp-fYRQ_Ifo_IlLa3OUUYQcsKf5eOtKnBmzRgDc_Z-17KhfA-gm1X-QOmMx7QJ6kfvLaGX9QQHgkHs7WM6WiWtkMzCvIvDOZxdqSag'
  },
  {
    name: 'hero-robot.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFP05gc2_wD0IbGalW2-NymsB2Xc9O1BsKnWL3YU-gpkwQct18JDbHAZPrQubqWsLzpuppLygu3btWvwZ8LfkogSaFU_O5Q9dZcEstPkMVwlHxT1wAxjvULcDITla0pMTJmI1VUpwnGvj1JpxCoMLZzwi_7eAf_GKWsNmGTEgQVzf15CeXR89Qe5OV9XTm-T6l6j67OYWJn2GGW4fyRshDQG5w2Ok5ZIIo1aefW8NKdsohy_7Xt6V9vY1JdfLCok9oMdmeSmGogTU4'
  },
  {
    name: 'team-bama.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpCVBk0dLSd1TUxSYL-8YVsJXGQBCpdRztBS6dhqcTmTnRClwKwuYS3rP0I6HNWqW8gQgoBf_183Gv7O8E3YbdgPogMk0fat4cd8ud7EKWYNLEQ3hScWFOt018iefXAyWXtiJ70mTE3q2y3ZnDgBDVgxIu71PtfMpKRp7_VPM-slBzxU-gkW4oh4n68v6G4f4LGDjhaBK5w8YKmzI-xM0ZAaijvJ81uyjvv5wGbVMQaOoc3xvNCiktOy_ovOLAeazNQ27ZMJRzuY5s'
  },
  {
    name: 'team-deryl.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOdhOmpw2TOPOO3Md-UNGLTGrgSYZ1p-26N514inQGNdnEpe6GRJakhFrpHOyLLmDRJWEntmKpIK6OStQ61VTiqsX-RdZr4n0Zd8Sw2THOjY6GQUTeRcJOuXZ-EFjVFLBTwKm-mLQgty34BzqKDVDQ6KZfZbG_pqiBYesxOZKKX0D4WLJLob3lQTGOdoO3mAdCb8al2YLzQDMPeYAY1UcNjmBNq67NFyk4KwpNBYE5qoQjlCwM8H2hPujOLgKSCOUBC9FNaZ6pHvd0'
  },
  {
    name: 'team-alifka.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTVpUCDKVYQ2SbyKiOyfTk-LMFVGEX7Wpu3PBhwEfWIqtdcHURVQLanKUKpw5SUFpMV7KU6RTuug-1YXo_7UZAA7D9YVdpyjE0RgPcwv0pAJEYCrKErSxu4un-OCc7u06sKfvbiqCm6Ti3OG8JyNtOBnltWm-dO5hynRwzlmYdd7w2WffhoV2hYYsKzHp3btoW3ZFeBMFTk692ZhGmgC9eHywhqaquuG4OnMC8K_zAaDIjeEoJ0TNv4Aav2QGZSz6ZsUPoFyyTK52v'
  },
  {
    name: 'footer-icon.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfLL_eC8FXA9o0wOE4nCiYZupS9dLps99VqjE9WWcA7YlUpR-04wOANmsBmcUDkDpPKSZ4WRAMhCrqn4fujycGJrJFehh1lWRqNrJyBRxOhJw1-T8Hw77auQiGKfV4I_NTwV0lUoCiOV-N-q6MwMkMsx-dsqGZHSYffTPgYd98dLqSCaePcMcChOoZ8DepJMaYtNvNW5MF1HG6MCEC-Zf_7Ky4CKrbsltZh-k5nTDvVu9AlM-axhGsXh6LGvVuo45aRRyDP6RNa7tE'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded: ${path.basename(dest)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading assets to:', destDir);
  for (const asset of assets) {
    const dest = path.join(destDir, asset.name);
    try {
      await download(asset.url, dest);
    } catch (err) {
      console.error(`Error downloading ${asset.name}:`, err.message);
    }
  }
  console.log('Done downloading assets!');
}

main();
