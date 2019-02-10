import { assert, expect } from 'chai';
import 'mocha';
import * as dataForge from 'data-forge';
import 'data-forge-fs';
import "../../index";
import * as path from 'path';
import { readJSON, writeJSON } from './test-utils';

describe('ema', () => {

    it('ema', async function () {

        const df = await dataForge.readFile("./src/test/data/STW.csv")
            .parseCSV({ dynamicTyping: true });

        const ema = df.deflate(row => row.close).ema(30).toArray();

        const outputFilePath = path.join(__dirname, "output", this.test.fullTitle() + ".json");
        
        // To write new output:
        //await writeJSON(outputFilePath, ema);

        const expectedOutput = await readJSON(outputFilePath);
        expect(ema).to.eql(expectedOutput);
    });

});
