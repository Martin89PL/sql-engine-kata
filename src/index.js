import CLI from "./cli";
import SqlEngine from "./sql_engine";

const cli = new CLI();
const engine = new SqlEngine();

cli.run();


cli.on('readline', (data) => {    
    /**
     * Tip: You should not implement engine logic here
     */

    const query = engine.normalizeQuery(data);
    engine.handleQuery(data);
});
