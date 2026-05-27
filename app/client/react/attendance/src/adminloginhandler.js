
export async function checkPassword(adminName, adminPassword, displayDiv) { 

try{
const res = await fetch("http://localhost:3000/admin-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            adminName: adminName,
            adminPassword: adminPassword
        })
    });

if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText); block
        }
const successMessage = await res.text();
    return successMessage;
} catch (error) {
        console.error("Network or Server Error:", error);
        throw error; 
    }
	
}