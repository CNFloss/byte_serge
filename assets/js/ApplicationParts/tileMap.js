export function TileMap() {
  this.mapCellSize = { width: 0, height: 0 };
  this.mapSize = { width: 0, height: 0 };
  this.tilesheet = null;
  this.tilesheetData = [];
  this.gameMap = [];
}

TileMap.prototype.setMapCellSize = function (width, height) {
  this.mapCellSize.width = width;
  this.mapCellSize.height = height;
};

TileMap.prototype.setMapSize = function (width, height) {
  this.mapSize.width = width;
  this.mapSize.height = height;
};

TileMap.prototype.setTilesheet = function (image) {
  this.tilesheet = image;
};

TileMap.prototype.setTilesheetData = function (data) {
  this.tilesheetData = data;
};

TileMap.prototype.setGameMap = function (map) {
  if (
    map.length !== this.mapSize.height ||
    map.some((row) => row.length !== this.mapSize.width)
  ) {
    throw new Error("Invalid game map size.");
  }
  this.gameMap = map;
};

TileMap.prototype.getTileData = function (x, y) {
  if (x < 0 || x >= this.mapSize.width || y < 0 || y >= this.mapSize.height) {
    throw new Error("Position out of bounds.");
  }
  const tileId = this.gameMap[y][x];
  return this.tilesheetData.find((data) => data.id === tileId);
};
