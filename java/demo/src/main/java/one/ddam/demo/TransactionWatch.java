package one.ddam.demo;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class TransactionWatch {
    private static Logger log = LoggerFactory.getLogger(TransactionWatch.class);

    @Scheduled(fixedRate = 60 * 1000)
    public void run() {
        // RPC endpoint
        String endpoint = "http://127.0.0.1:8101";

        /*
         * 1.获取当前块高度: Gx_blockHeight
         */
        JSONObject blockHeight = new JSONObject();

        blockHeight.put("method", "Gx_blockHeight");
        blockHeight.put("params", JSONArray.parseArray("[]"));
        blockHeight.put("jsonrpc", "2.0");
        blockHeight.put("id", 1);

        log.info("Gx_blockHeight: {}", this.doHttpRequest(endpoint, blockHeight));

        /*
         * 2.获取某账户余额: Gx_balance
         */
        JSONObject balance = new JSONObject();
        String account = "DD573f9a860f5584da9cc7c43b4b5559234e7b965601dea7b3bdf43b0e2ad6e546";

        balance.put("method", "Gx_balance");
        balance.put("params", JSONArray.parseArray("[\"" + account + "\"]"));
        balance.put("jsonrpc", "2.0");
        balance.put("id", 1);

        log.info("Gx_balance: {}", this.doHttpRequest(endpoint, balance));

        /*
         * 3.转账交易
         */

    }

    private String doHttpRequest(String api, JSONObject req) {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost payload = new HttpPost(api);

        payload.addHeader("Content-Type", "application/json");
        payload.setEntity(new StringEntity(req.toJSONString(), "utf-8"));

        try {
            CloseableHttpResponse resp = client.execute(payload);
            HttpEntity result = resp.getEntity();

            return EntityUtils.toString(result, "utf-8");
        } catch (Exception e) {
            log.error("RPC {}, {}", req, e.getMessage());
            return null;
        }
    }
}
