import request from "supertest";
import server from '../app';

//Test either todos are coming or not
describe("GET todos list test", () => {
	it("should return 200 OK And Success in Response Body", (done) => {
		return request(server).get("/api/todos/")
			.expect(200, done)
			.expect(function (res) {
				if (!('success' in res.body)) {
					throw new Error('Missing Desired Object');
				} else {
					console.log("Test Passed")
				}
			}, done)
	}, 15000);
});
//Test single todo are coming or not
describe("GET single todo test", () => {
	it("should return 200 OK And Success in Response Body", (done) => {
		return request(server).get("/api/todos/5ba0b338622c260b9881c58e")
			.expect(200, done)
			.expect(function (res) {
				if (!('success' in res.body)) {
					throw new Error('Missing Desired Object');
				} else {
					console.log("Test Passed")
				}
			}, done)
	});
});

//Test insert todo are coming or not
describe("POST single todo test", () => {
	it("should return 200 OK And Success in Response Body", (done) => {
		return request(server)
			.post("/api/todos")
			.send(
				{
					title: "testing",
					place: "Fsd",
					description: "at 1 Pm!"
				})
			.expect(200, done)
			.expect(function (res) {
				if (!('success' in res.body)) {
					throw new Error('Missing Desired Object');
				} else {
					console.log("Test Passed")
				}
			}, done)
	});
	//Test update todo are coming or not
	describe("PUT single todo test", () => {
		it("should return 200 OK And Success in Response Body", (done) => {
			return request(server)
				.put("/api/todos/5ba0b338622c260b9881c58e")
				.send(
					{
						title: "testing",
						place: "Fsd",
						description: "at 1 Pm!"
					})
				.expect(200, done)
				.expect(function (res) {
					if (!('success' in res.body)) {
						throw new Error('Missing Desired Object');
					} else {
						console.log("Test Passed")
					}
				}, done)
		});
	});

	//Test Delete todo are coming or not
	describe("DELETE single todo test", () => {
		it("should return 200 OK And Success in Response Body", (done) => {
			return request(server)
				.delete("/api/todos/5ba0b338622c260b9881c58e")
				.expect(200, done)
				.expect(function (res) {
					if (!('success' in res.body)) {
						throw new Error('Missing Desired Object');
					} else {
						console.log("Test Passed")
					}
				}, done)
		});
	});
});


