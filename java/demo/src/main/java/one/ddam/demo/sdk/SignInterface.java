package one.ddam.demo.sdk;

import com.sun.jna.Library;
import com.sun.jna.Native;

public interface SignInterface extends Library {

    // 动态库绝对路径
    SignInterface INSTANCE = (SignInterface) Native.loadLibrary("signtx", SignInterface.class);

    // 动态库签名方法
    GoString.ByValue Signtx(GoString.ByValue sk, GoString.ByValue targetAddr, long value, long gasLimit, long gasPrice,
                            int type, long nonce, GoString.ByValue dataHex);

}
