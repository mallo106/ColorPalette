const ColorPalette = require("./libs/colorPalette/ColorPalette");
const kColorPalette = require("./Colors/palette2");
const kAltColorPalette = require("./Colors/palette1");
const aColorPalette = new ColorPalette(kColorPalette);
const aAltColorPalette = new ColorPalette(kAltColorPalette);
const aTestImages = [
	"https://i.redditmedia.com/wTCiX0jv2XPM9Y9m0TsiDrcaF2fqyVntvOszSl_ze5A.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=960&s=4dbad74644de35df93af87a363d76334",
	"https://i.redditmedia.com/TDq98kR8pvIDvSBaml6L7ABNDiKXIJYcSIEdYV6A_as.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=640&s=c6dec8b78650eb42c5f4068fe351c07f",
	"https://preview.redd.it/ahj3weeiesl11.jpg?width=640&crop=smart&s=d4128697f3abac2ff57684b2d60476de062154c8",
	"https://i.redditmedia.com/kESiVY8NqMsObxscRYuc6qTQ81OVKtjItJObj9ZMS30.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=640&s=3bf39ba21d11e30c21ce9532d3499eaa",
	"https://i.redditmedia.com/Q23nU7gNkvtDE4nPBsPdt0TxrYWZ5CrKoIyav8cH-pE.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=640&s=110cb965fc6ae072665ea144f9404c74"
];

function logResults(anOutput)
{
	return console.log("done", anOutput);
}
aTestImages.forEach((image, i) => {
	aColorPalette.map(image, `./OutputImages/${i}/cp.jpg`, true, logResults);
	aAltColorPalette.map(image, `./OutputImages/${i}/pt.jpg`, false, logResults);
});
