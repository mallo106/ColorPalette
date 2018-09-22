class ColorTree
{
	constructor(theAxisCount, theColorPalette)
	{
		this.myAxisCount = theAxisCount;
		this.myRoot = undefined;
		this.myRootAxisValue = undefined;
		this.myLeft = undefined;
		this.myRight = undefined;
		theColorPalette.forEach( aColor => {
			this.add(aColor, undefined, undefined);
		});
	}

	searchForNearest(theInt, theNearestInt)
	{
		if (theInt === 255 + 1)
		{
			debugger;
		}
		if (this.myRoot === theInt)
		{
			return theInt;
		}
		if (theNearestInt === undefined)
		{
			theNearestInt = this.myRoot;
		}
		let anAxisColor = this.getAxisValue(theInt);
		if (anAxisColor < this.myRootAxisValue)
		{
			if (this.myLeft === undefined)
			{
				theNearestInt = this.myRoot;
			} else
			{
				theNearestInt = this.myLeft.searchForNearest(theInt, theNearestInt);
			}
			theNearestInt = this.distance(theInt, this.myRoot) < this.distance(theInt, theNearestInt) ? this.myRoot : theNearestInt;
			return this.searchBranchIfIntersects(theInt, theNearestInt, this.myRight);
		} else
		{
			if (this.myRight === undefined)
			{
				theNearestInt = this.myRoot;
			} else
			{
				theNearestInt = this.myRight.searchForNearest(theInt, theNearestInt);
			}
			theNearestInt = this.distance(theInt, this.myRoot) < this.distance(theInt, theNearestInt) ? this.myRoot : theNearestInt;
			return this.searchBranchIfIntersects(theInt, theNearestInt, this.myLeft);
		}
	}
	search(theInt)
	{
		return this.searchForNearest(theInt, undefined);
	}

	distance(a, b)
	{
		if (a === undefined || b === undefined)
		{
			return 0xffffff * 5; //SomeBigNumber
		}
		let mySumOfDiffs = 0;
		for (var i = 0 ; i < this.myAxisCount; i++)
		{
			mySumOfDiffs += Math.pow(this.getShift(a, i) - this.getShift(b,i), 2);
		}
		return Math.sqrt(mySumOfDiffs);
	}

	getAxisValue(theInt)
	{
		return (theInt >> (this.myAxis * 8)) & 0xff;
	}

	add(theInt, theDepth, path)
	{
		this.path = path;
		if (!this.myRoot)
		{
			this.myRoot = theInt;
			this.myAxis = !theDepth ? 0 : theDepth % this.myAxisCount;
			this.myRootAxisValue = this.getAxisValue(this.myRoot);
			return;
		}
		let anAxisColor = this.getAxisValue(theInt);
		if (anAxisColor < this.myRootAxisValue)
		{
			if (!this.myLeft)
			{
				this.myLeft = new ColorTree(this.myAxisCount, []);
			}
			this.myLeft.add(theInt, this.myAxis + 1, !path ? "L" : path + "L");
		} else
		{
			if (!this.myRight)
			{
				this.myRight = new ColorTree(this.myAxisCount, []);
			}
			this.myRight.add(theInt, this.myAxis + 1, !path ? "R" : path + "R");
		}
	}

	/**
	 * Helpful for debugging
	 * @returns {{}}
	 */
	getObject() {
		let aReturn = {};
		aReturn.value = this.myRoot;
		aReturn.path = this.path;
		aReturn.left = !this.myLeft ? undefined : this.myLeft.getObject();
		aReturn.right = !this.myRight ? undefined : this.myRight.getObject();
		return aReturn;
	}

	searchBranchIfIntersects(theInt, theNearestInt, theBranch)
	{
		if (theBranch !== undefined && Math.abs(this.myRootAxisValue - this.getAxisValue(theInt)) < this.distance(theNearestInt, theInt))
		{
			//there might be a better point on the other side of the tree
			let anOtherBranchBest = theBranch.search(theInt, theNearestInt);
			return this.distance(anOtherBranchBest, theInt) < this.distance(theNearestInt, theInt) ? anOtherBranchBest : theNearestInt;
		}
		return theNearestInt;
	}

	nearestDistance(aSearch, aTestNode, aBest)
	{
		return this.distance(aSearch, aTestNode) < this.distance(aSearch, aBest) ? aTestNode : aBest;
	}

	getShift(theInt, theShift)
	{
		return (theInt >> (theShift * 8)) & 0xff;
	}

	getValue()
	{
		return this.myRoot;
	}
}

module.exports = ColorTree;