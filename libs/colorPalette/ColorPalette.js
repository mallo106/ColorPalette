const Jimp = require("jimp");
const ColorTree = require("../colorTree/ColorTree");

class ColorPalette {
	constructor(thePixelColors)
	{
		this.myColorTree = new ColorTree(4, thePixelColors);
	}

	map(theImagePath, theOutputPath, theSaveOriginal, theCallback)
	{
		Jimp.read(theImagePath).then( (image) => {
			if (theSaveOriginal){
				const aFilePath = theOutputPath.lastIndexOf("/") + 1;
				const anIndex = theOutputPath.lastIndexOf(".");
				const aPath = theOutputPath.substr(0, aFilePath) + "original" + theOutputPath.substring(anIndex);
				image.write(aPath);
				!!theCallback && theCallback(aPath);
			}
			const width = image.bitmap.width;
			const height = image.bitmap.height;
			for (let w = 0; w < width; w++)
			{
				for (let h = 0; h < height; h++)
				{
					const aPixel = image.getPixelColor(w,h);
					const aFound = this.myColorTree.search(aPixel);
					image.setPixelColor(aFound, w, h);
				}
			}
			image.write(theOutputPath);
			!!theCallback && theCallback(theOutputPath);
			return 1;
		});
	}
}

module.exports = ColorPalette;