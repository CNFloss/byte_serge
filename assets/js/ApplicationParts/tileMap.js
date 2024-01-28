import { DataGrid } from "./dataGrid.js";

export function TileMap() {
  this.mapCellSize = { width: 0, height: 0 };
  this.mapSize = { width: 0, height: 0 };
  this.tilesheet = null;
  this.tilesheetData = {};
  this.gameMap = null;
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

TileMap.prototype.setTilesheetDataFromJSON = function (jsonData) {
  try {
    // Assuming jsonData is a JSON string
    this.tilesheetData = JSON.parse(jsonData);
  } catch (error) {
    console.error("Invalid JSON data provided:", error);
  }
};

TileMap.prototype.setGameMap = function (dataGrid) {
  this.gameMap = dataGrid;
};

TileMap.prototype.getTileData = function (x, y) {
  if (x < 0 || x >= this.mapSize.width || y < 0 || y >= this.mapSize.height) {
    throw new Error("Position out of bounds.");
  }
  const tileId = this.gameMap[y][x];
  return this.tilesheetData.find((data) => data.id === tileId);
};
