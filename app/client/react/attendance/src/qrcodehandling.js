let scanner = null;
import { Html5QrcodeScanner } from "html5-qrcode";
import QRCode from "qrcode";

export async function stopScanner() {
    const modal = document.getElementById('scanner-modal');

    if (scanner) {
        try {
            // 1. Stop the camera properly
            await scanner.clear();
            scanner = null;
        } catch (err) {
            console.log("Error during stop:", err);
        }
    }

    // 2. Hide the UI
    if (modal) modal.style.display = 'none';
    // 3. Clean up the internal HTML to prevent "ghost" cameras
    const reader = document.getElementById('reader');
    if (reader) reader.innerHTML = '';
}

export function startScanner() {
    const modal = document.getElementById('scanner-modal');
    if (modal) modal.style.display = 'flex';

    // Initialize new instance every time to avoid 'already running' errors
    scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
    });

    scanner.render((text) => {
        const pinText = text.slice(0, 4);
        const dashIndex = text.indexOf("-");
        const firstName = text.slice(4, dashIndex);
        const lastName = text.slice(dashIndex + 1);

        const firstElem = document.getElementById("student_firstname");
        const lastElem = document.getElementById("student_lastname");
        const loginElem = document.getElementById("login_id");

        if (firstElem) firstElem.value = firstName;
        if (lastElem) lastElem.value = lastName;
        if (loginElem) loginElem.value = pinText;

        stopScanner();
    });
}

export function generate() {
    
    const pin = document.getElementById("login_id").value;
    const firstName = document.getElementById("student_firstname").value;
    const lastName = document.getElementById("student_lastname").value;

    const code = pin + firstName + "-" + lastName;

    // Generate QR code as Data URL
    QRCode.toDataURL(code, function (err, url) {
        if (err) {
            console.error(err);
            return;
        }

        console.log("QR URL:", url);

        // Display in image
        document.getElementById("qrImage").src = url;
    });
}

// Event listeners are attached from the React component after mount.


// Use this for the scanner popup:

/* 
<button id="open-scanner" style="padding: 15px; font-size: 16px;">Open Scanner</button>

<div id="scanner-modal"
    style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 9999; align-items: center; justify-content: center;">
    <div
        style="background: white; padding: 20px; border-radius: 12px; width: 90%; max-width: 450px; position: relative;">

        <!-- FIXED CLOSE BUTTON -->
        <button id="close-scanner"
            style="position: absolute; top: -40px; right: 0; background: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">
            CLOSE [X]
        </button>

        <div id="reader"></div>
    </div>
</div>
*/