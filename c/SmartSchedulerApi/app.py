from flask import Flask, jsonify, request
from flask_cors import CORS  # ✅ add this line

app = Flask(__name__)
CORS(app)  # ✅ enable CORS globally

@app.route('/')
def home():
    return jsonify({"message": "✅ Smart Scheduler API with Dependencies is running!"})

@app.route('/api/v1/projects/<int:project_id>/schedule', methods=['POST'])
def generate_schedule(project_id):
    data = request.get_json()
    tasks = data.get('tasks', [])

    # Build dependency graph
    graph = {task["title"]: task["dependencies"] for task in tasks}
    visited = set()
    stack = []

    def dfs(task):
        if task in visited:
            return
        visited.add(task)
        for dep in graph[task]:
            dfs(dep)
        stack.append(task)

    for t in graph:
        dfs(t)

    recommended_order = stack

    return jsonify({
        "project_id": project_id,
        "recommendedOrder": recommended_order
    })

if __name__ == '__main__':
    app.run(debug=True)
