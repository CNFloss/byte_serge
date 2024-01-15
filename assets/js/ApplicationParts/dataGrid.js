export function DataGrid(rows, columns, depth, quadSize) {
  this.sections = new Array(depth);

  for (let z = 0; z < depth; z++) {
    this.sections[z] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      this.sections[z][y] = new Array(columns);
      for (let x = 0; x < columns; x++) {
        this.sections[z][y][x] = {
          x: x * quadSize,
          y: y * quadSize,
          z: z * quadSize,
        };
      }
    }
  }

  console.log(this.sections);
}

DataGrid.prototype.getVisibleSections = function (camera) {
  // Determine which sections are visible based on camera's position
};

DataGrid.prototype.loadSection = function (sectionKey) {
  // Load a section by its key
};

DataGrid.prototype.unloadSection = function (sectionKey) {
  // Unload a section by its key
};
