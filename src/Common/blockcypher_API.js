/* ChatGPT Ref: ./src/Common/blockcypher_API.js */
import axios from 'axios';
import config from "../Config/config";

export default async function get_the_Blockcypher_transactions(address) {
        console.info("top of get_the_Blockcypher_transactions(" + address + ") in blockcypher(update).");
        try {

                let work_txs = [];
                let cum_total = parseFloat("0.0");
                const url_stg = "https://api.blockcypher.com/v1/doge/main/addrs/" + address + "?includeScript=true&unspentOnly=true";
                const result = await axios.get(url_stg);
                const data = result.data;
                console.log(data);


                if (data && data.txrefs && data.txrefs.length) {
                        console.info("Here's data.txs. Number in array: " + data.txrefs.length + '.');
                        console.log(data.txrefs);

                        for (let i=0; i < data.txrefs.length; i++)
                        {
                                const obj = {
                                        txid: data.txrefs[i].tx_hash,
                                        output_no: data.txrefs[i].tx_output_n,
                                        value: data.txrefs[i].value/100000000,
                                        script_hex: data.txrefs[i].script,
                                        rel: []
                                }
                                work_txs.push(obj);
                                cum_total = cum_total + (data.txrefs[i].value/100000000);
                        }

                        console.info("Here are the txs so far:");
                        for (let i=0;i<work_txs.length;i++) {
                                console.info( "blockcypher:TX(" + i + "): " + work_txs[i].txid + ", output_no: " + work_txs[i].output_no + ", value: " + work_txs[i].value);
                        }

                        if (data.hasMore === true) {            
//                                alert("data.hasMore = true in get_the_Blockcypher_transactions_blockcypher_update! This is a sandy account. Cumulative total = " + cum_total);
                                alert("This is a sandy account! Cumlative total = " + cum_total + ".");
                        }

                        console.info("Cumulative Totals from transactions: "  + cum_total);
                        return work_txs;
                } else {
                        return config.No_Unspent_Transactions;
                }

        } catch (e) {
                console.log(e);
        }
}
