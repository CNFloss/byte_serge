import { DataGrid } from "./dataGrid.js";
/**
 * Represents a TileMap for managing a game map with a tilesheet.
 */
export function TileMap() {
  /** @property {Object} mapCellSize - The size of each cell in the map. */
  this.mapCellSize = { width: 0, height: 0, depth: 0 };

  /** @property {Object} mapSize - The overall size of the map. */
  this.mapSize = { width: 0, height: 0, depth: 0 };

  /** @property {Image|null} tilesheet - The image or canvas used as the tilesheet. */
  this.tilesheet = null;

  /** @property {Object} tilesheetData - The data associated with the tilesheet. */
  this.tilesheetData = {};

  /** @property {DataGrid} gameMap - The game map data structure. */
  this.gameMap = null;
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 */
TileMap.prototype.renderMap = function (context) {
  if (this.gameMap && this.gameMap.sections) {
    this.gameMap.sections.forEach((section) => {
      section.forEach((row) => {
        row.forEach((cell) => {
          console.log(cell);
          const tileData = this.getTileData(cell.x, cell.y);
          if (this.tilesheet) {
            context.drawImage(
              this.tilesheet,
              tileData.x,
              tileData.y,
              this.mapCellSize.width,
              this.mapCellSize.height,
              cell.x,
              cell.y,
              this.mapCellSize.width,
              this.mapCellSize.height
            );
          }
        });
      });
    });
  }
};

/**
 * Sets the size of each cell in the map.
 * @param {number} width - The width of the cell.
 * @param {number} height - The height of the cell.
 * @param {number} depth - The depth of the cell.
 */
TileMap.prototype._setMapCellSize = function (width, height, depth) {
  this.mapCellSize.width = width || 1;
  this.mapCellSize.height = height || 1;
  this.mapCellSize.depth = depth || 1;
};

/**
 * Sets the overall size of the map.
 * @param {number} width - The width of the map.
 * @param {number} height - The height of the map.
 * @param {number} depth - The depth of the map.
 */
TileMap.prototype._setMapSize = function (width, height, depth) {
  this.mapSize.width = width;
  this.mapSize.height = height;
  this.mapSize.depth = depth;
};

/**
 * Sets the tilesheet used for the map.
 * @param {HTMLImageElement} image - The image element representing the tilesheet.
 */
TileMap.prototype.setTilesheet = function (image) {
  // @ts-ignore
  this.tilesheet = document.createElement("canvas");
  const offScreenTileSheetCTX = this.tilesheet.getContext("2d");

  // Set the canvas size to match the image size
  this.tilesheet.width = image.width;
  this.tilesheet.height = image.height;

  // Use drawImage to draw the image onto the canvas
  // Note: No need to use @ts-ignore if the types are correct
  // @ts-ignore
  offScreenTileSheetCTX.drawImage(image, 0, 0, image.width, image.height);
};

/**
 * Sets the data associated with the tilesheet.
 * @param {Object} data - The tilesheet data.
 */
TileMap.prototype.setTilesheetData = function (data) {
  this.tilesheetData = data;
};

/**
 * Sets the tilesheet data from a JSON string.
 * @param {string} jsonData - The JSON string containing tilesheet data.
 */
TileMap.prototype.setTilesheetDataFromJSON = function (jsonData) {
  try {
    // Assuming jsonData is a JSON string
    this.tilesheetData = JSON.parse(jsonData);
    console.log("Tilesheet data set:", this.tilesheetData);
  } catch (error) {
    console.error("Invalid JSON data provided:", error);
  }
};

/**
 * Sets the game map data grid.
 * @param {DataGrid} dataGrid - The data grid for the game map.
 */
TileMap.prototype.setGameMap = function (dataGrid) {
  this.gameMap = dataGrid;
  this._setMapSize(dataGrid.columns, dataGrid.rows, dataGrid.depth);
};

/**
 * Retrieves tile data for a specific position in the map.
 * @param {number} x - The x position of the tile.
 * @param {number} y - The y position of the tile.
 * @returns {Object|null} The tile data if found, otherwise null.
 * @throws {Error} If the position is out of bounds.
 */
TileMap.prototype.getTileData = function (x, y, z = 0) {
  console.log(x, y, this.mapSize.width, this.mapSize.height);
  if (x < 0 || x >= this.mapSize.width || y < 0 || y >= this.mapSize.height) {
    throw new Error("Position out of bounds.");
  }
  const tileId = this.gameMap ? this.gameMap.sections[z][y][x] : null;
  if (tileId === null) {
    throw new Error("Tile missing from map");
  }
  console.log(this.tilesheetData, tileId);
  return this.tilesheetData.find((data) => data.id === tileId);
};
