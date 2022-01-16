const fs = require('fs/promises')
const path = require('path')
const Image = require("@11ty/eleventy-img")

const PATH_PREFIX = '/'

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)
  eleventyConfig.addNunjucksAsyncShortcode("responsiveImage", responsiveImageShortcode)

  eleventyConfig.addPassthroughCopy({
    static: '/',
  })

  eleventyConfig.addNunjucksAsyncShortcode('viteScriptTag', viteScriptTag);

  eleventyConfig.addNunjucksAsyncShortcode(
    'viteLinkStylesheetTags',
    viteLinkStylesheetTags
  );

  eleventyConfig.addNunjucksAsyncShortcode(
    'viteLinkModulePreloadTags',
    viteLinkModulePreloadTags
  );

  // Configuration
  return {
    dir: {
      input: 'src/views',
      output: '_site',
      includes: '_inc',
      data: '_data',
    },
  }
}

//-----//
async function imageShortcode(src, cls, alt, originalFormat = "jpeg", sizes = "100vw", widths = [null]) {
  if(alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  const metadata = await Image(src, {
    widths: widths,
    formats: ["webp", originalFormat],
    urlPath: "/assets/img/",
    outputDir: "./_site/assets/img/"
  });

  const originalSrc = metadata[`${originalFormat}`]
  const lowsrc = originalSrc[0];
  const highsrc = originalSrc[originalSrc.length - 1];

  return `<picture>
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        class="${cls}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        decoding="async"
        loading="lazy"
      />
    </picture>`;
}

//-----//
async function responsiveImageShortcode(src, mobileSrc, cls, alt, originalFormat = "jpeg") {
  if(alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  const metadata = {
    pc: await Image(src, {
      formats: ["webp", originalFormat],
      urlPath: "/assets/img/",
      outputDir: "./_site/assets/img/"
    }),
    mobile: await Image(mobileSrc, {
      formats: ["webp", originalFormat],
      urlPath: "/assets/img/",
      outputDir: "./_site/assets/img/"
    })
  }

  const originalSrc = {
    pc: metadata.pc[`${originalFormat}`],
    mobile: metadata.mobile[`${originalFormat}`]
  }

  const lowsrc = {
    pc: originalSrc.pc[0],
    mobile: originalSrc.mobile[0]
  };

  return `<picture>
    ${Object.values(metadata.pc).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" media="(min-width:640px)">`;
    }).join("\n")}
    ${Object.values(metadata.mobile).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}">`;
    }).join("\n")}
    <img
      class="${cls}"
      src="${lowsrc.mobile.url}"
      alt="${alt}"
      decoding="async"
      loading="lazy"
    />
  </picture>`;
}

//-----//
async function viteScriptTag(entryFilename) {
  const entryChunk = await getChunkInformationFor(entryFilename);
  return `<script type='module' src='${PATH_PREFIX}${entryChunk.file}'></script>`;
}

//-----//
async function viteLinkModulePreloadTags(entryFilename) {
  const entryChunk = await getChunkInformationFor(entryFilename);

  if (!entryChunk.imports || entryChunk.imports.length === 0) {
    console.log(
      `The script for ${entryFilename} has no imports. Nothing to preload.`
    );

    return '';
  }

  const allPreloadTags = await Promise.all(
    entryChunk.imports.map(async (importEntryFilename) => {
      const chunk = await getChunkInformationFor(importEntryFilename);
      return `<link rel='modulepreload' href='${PATH_PREFIX}${chunk.file}'></link>`;
    })
  );

  return allPreloadTags.join('\n');
}

//-----//
async function viteLinkStylesheetTags(entryFilename) {
  const entryChunk = await getChunkInformationFor(entryFilename);

  if (!entryChunk.css || entryChunk.css.length === 0) {
    console.warn(`No css found for ${entryFilename} entry. Is that correct?`);
    return '';
  }

  return entryChunk.css
    .map(
      (cssFile) =>
        `<link rel='stylesheet' href='${PATH_PREFIX}${cssFile}'></link>`
    )
    .join('\n');
}

//-----//
async function getChunkInformationFor(entryFilename) {
  if (!entryFilename) {
    throw new Error(
      'You must specify an entryFilename, so that vite-script can find the correct file.'
    );
  }

  // TODO: Consider caching this call, to avoid going to the filesystem every time
  const manifest = await fs.readFile(
    path.resolve(process.cwd(), '_site', 'manifest.json')
  );

  const parsed = JSON.parse(manifest);

  let entryChunk = parsed[entryFilename];

  if (!entryChunk) {
    const possibleEntries = Object.values(parsed)
      .filter((chunk) => chunk.isEntry === true)
      .map((chunk) => `'${chunk.src}'`)
      .join(`, `);

    throw new Error(
      `No entry for ${entryFilename} found in _site/manifest.json. Valid entries in manifest: ${possibleEntries}`
    );
  }

  return entryChunk;
}
