export const placementAiAuth = {
    getUsers() {
        return JSON.parse(localStorage.getItem("users") || "{}");
    },

    saveUser(username, role, password) {
        const users = this.getUsers();
        users[username] = { password, role };
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    },

    login(username, password, role) {
        const users = this.getUsers();
        if (!users[username]) return { error: "User does not exist" };
        if (users[username].password !== password) return { error: "Incorrect password" };
        if (users[username].role !== role) return { error: `Not registered as a ${role}` };
        
        localStorage.setItem("currentUser", username);
        return { success: true, username, role };
    },

    logout() {
        localStorage.removeItem("currentUser");
    },

    getCurrentUser() {
        return localStorage.getItem("currentUser");
    },

    getProfile(username) {
        return JSON.parse(localStorage.getItem(`profile_${username}`) || "{}");
    },

    saveProfile(username, profile) {
        localStorage.setItem(`profile_${username}`, JSON.stringify(profile));
    },

    deleteStudent(username) {
        const users = this.getUsers();
        delete users[username];
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.removeItem(`profile_${username}`);
        
        const scores = JSON.parse(localStorage.getItem("scores") || "{}");
        delete scores[username];
        localStorage.setItem("scores", JSON.stringify(scores));
    },

    clearAllData() {
        localStorage.clear();
    }
};
