// Supabase Configuration
const SUPABASE_URL = "https://jqwyadsjhgbpqcauapwv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_K_x9y35_m3MPDhIPmIt70g_fIZSG3PJ";

// Initialize Supabase Client
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");
const statusMessage = document.getElementById("statusMessage");

// Search Function
async function searchShops() {
    const query = searchInput.value.trim();

    if (!query) {
        statusMessage.textContent = "Please enter an issue to search.";
        resultsDiv.innerHTML = "";
        return;
    }

    statusMessage.textContent = "Searching...";

    try {
        const { data, error } = await db
            .from("shops")
            .select("*")
            .ilike("issue", `%${query}%`)
            .order("name", { ascending: true });

        if (error) {
            throw error;
        }

        displayResults(data);
    } catch (err) {
        console.error("Error fetching data:", err);
        statusMessage.textContent = "An error occurred while fetching data.";
    }
}

// Display Results
function displayResults(data) {
    resultsDiv.innerHTML = "";

    if (!data || data.length === 0) {
        statusMessage.textContent = "No results found.";
        return;
    }

    statusMessage.textContent = `${data.length} result(s) found.`;

    data.forEach(shop => {
        const card = document.createElement("div");
        card.className = "result-card";

        card.innerHTML = `
            <h3>${shop.name}</h3>
            <p><strong>Issue:</strong> ${shop.issue}</p>
            <p>${shop.reason}</p>
            <p>
                <a href="${shop.url}" target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>
            ${shop.affiliate ? '<span class="badge">Affiliate Partner</span>' : ''}
        `;

        resultsDiv.appendChild(card);
    });
}

// Event Listeners
searchButton.addEventListener("click", searchShops);

searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchShops();
    }
});

// Optional: Load all data on page load
window.addEventListener("DOMContentLoaded", () => {
    statusMessage.textContent = "Enter an issue to begin searching.";
});
