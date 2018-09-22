const ColorPalette = require("./libs/colorPalette/ColorPalette");
const kColorPalette = require("./Colors/palette2");
const kAltColorPalette = require("./Colors/palette1");
const aColorPalette = new ColorPalette(kColorPalette);
const aAltColorPalette = new ColorPalette(kAltColorPalette);
const aTestImages = [
	"https://i.redditmedia.com/TDq98kR8pvIDvSBaml6L7ABNDiKXIJYcSIEdYV6A_as.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=640&s=c6dec8b78650eb42c5f4068fe351c07f",
	"https://preview.redd.it/ahj3weeiesl11.jpg?width=640&crop=smart&s=d4128697f3abac2ff57684b2d60476de062154c8",
];

function logResults(anOutput)
{
	return console.log("done", anOutput);
}
aTestImages.forEach((image, i) => {
	aColorPalette.map(image, `./OutputImages/${i}/cp.jpg`, true, logResults);
	aAltColorPalette.map(image, `./OutputImages/${i}/pt.jpg`, false, logResults);
});
