import fetch from "node:http";

const BASE_URL = "http://localhost:4000";

async function request(method, path, body = null) {
    const url = `${BASE_URL}${path}`;
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await globalThis.fetch(url, options);
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
}

async function runTests() {
    console.log("=================================================");
    console.log("🚀 Running All API Command Tests Against Backend");
    console.log(`🔗 Target URL: ${BASE_URL}`);
    console.log("=================================================\n");

    const testUser = {
        username: `testuser_${Date.now()}`,
        email: `test_${Date.now()}@example.com`,
        password: "securePassword123"
    };

    // 1. Register User
    console.log("▶ [1/7] Testing: Register User (POST /api/v1/users/register)");
    const registerRes = await request("POST", "/api/v1/users/register", testUser);
    console.log(`   Status: ${registerRes.status}`);
    console.log("   Response:", JSON.stringify(registerRes.data, null, 2));
    if (registerRes.status !== 201) throw new Error("Registration failed");
    console.log("   ✔ User registered successfully!\n");

    // 2. Login User
    console.log("▶ [2/7] Testing: Login User (POST /api/v1/users/login)");
    const loginRes = await request("POST", "/api/v1/users/login", {
        email: testUser.email,
        password: testUser.password
    });
    console.log(`   Status: ${loginRes.status}`);
    console.log("   Response:", JSON.stringify(loginRes.data, null, 2));
    if (loginRes.status !== 200) throw new Error("Login failed");
    console.log("   ✔ User logged in successfully!\n");

    // 3. Create Post
    console.log("▶ [3/7] Testing: Create Post (POST /api/v1/posts/create)");
    const postData = {
        name: "Vinay Duggar",
        description: "Testing full CRUD operations for MongoDB evaluation assignment",
        age: 22
    };
    const createPostRes = await request("POST", "/api/v1/posts/create", postData);
    console.log(`   Status: ${createPostRes.status}`);
    console.log("   Response:", JSON.stringify(createPostRes.data, null, 2));
    if (createPostRes.status !== 201 || !createPostRes.data.post?._id) throw new Error("Post creation failed");
    const createdPostId = createPostRes.data.post._id;
    console.log(`   ✔ Post created successfully! ID: ${createdPostId}\n`);

    // 4. Get All Posts
    console.log("▶ [4/7] Testing: Get All Posts (GET /api/v1/posts/getPosts)");
    const getPostsRes = await request("GET", "/api/v1/posts/getPosts");
    console.log(`   Status: ${getPostsRes.status}`);
    console.log(`   Total Posts retrieved: ${Array.isArray(getPostsRes.data) ? getPostsRes.data.length : 0}`);
    console.log("   Sample Post:", JSON.stringify(getPostsRes.data[0] || {}, null, 2));
    if (getPostsRes.status !== 200) throw new Error("Get posts failed");
    console.log("   ✔ All posts retrieved successfully!\n");

    // 5. Update Post
    console.log(`▶ [5/7] Testing: Update Post (PATCH /api/v1/posts/update/${createdPostId})`);
    const updateRes = await request("PATCH", `/api/v1/posts/update/${createdPostId}`, {
        name: "Vinay Duggar (Updated via Automation)",
        age: 23
    });
    console.log(`   Status: ${updateRes.status}`);
    console.log("   Response:", JSON.stringify(updateRes.data, null, 2));
    if (updateRes.status !== 200) throw new Error("Update post failed");
    console.log("   ✔ Post updated successfully!\n");

    // 6. Delete Post
    console.log(`▶ [6/7] Testing: Delete Post (DELETE /api/v1/posts/delete/${createdPostId})`);
    const deleteRes = await request("DELETE", `/api/v1/posts/delete/${createdPostId}`);
    console.log(`   Status: ${deleteRes.status}`);
    console.log("   Response:", JSON.stringify(deleteRes.data, null, 2));
    if (deleteRes.status !== 200) throw new Error("Delete post failed");
    console.log("   ✔ Post deleted successfully!\n");

    // 7. Logout User
    console.log("▶ [7/7] Testing: Logout User (POST /api/v1/users/logout)");
    const logoutRes = await request("POST", "/api/v1/users/logout", {
        email: testUser.email
    });
    console.log(`   Status: ${logoutRes.status}`);
    console.log("   Response:", JSON.stringify(logoutRes.data, null, 2));
    if (logoutRes.status !== 200) throw new Error("Logout failed");
    console.log("   ✔ User logged out successfully!\n");

    console.log("=================================================");
    console.log("🎉 ALL 7 API COMMANDS EXECUTED AND PASSED 100%!");
    console.log("=================================================");
}

runTests().catch((err) => {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
});
