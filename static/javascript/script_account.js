async function main() {
    user_data = await getFixedUserData();
    for (const user_id in user_data) {
        const table_accounts = document.getElementById("tbody_accounts");
        const tr_account_item = document.createElement("tr");
        const td_user_id = document.createElement("td");
        td_user_id.textContent = user_id;
        tr_account_item.appendChild(td_user_id);
        const td_user_name = document.createElement("td");
        appendUserDisplayToElement(user_data, user_id, td_user_name);
        tr_account_item.appendChild(td_user_name);
        const td_user_zhua = document.createElement("td");
        td_user_zhua.textContent = user_data[user_id]["zhua"];
        tr_account_item.appendChild(td_user_zhua);
        table_accounts.appendChild(tr_account_item);
    }
}

main();