from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:////link/to/the/folder/auth.db'

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    mail = db.Column(db.String(50))
    password = db.Column(db.String(80))
    status = db.Column(db.String(50))


@app.route("/users", methods=['GET'])
def get_all_users():

    users = User.query.all()

    output = []

    for user in users:
        user_data = {}
        user_data['public_id'] = user.public_id
        user_data['name'] = user.name
        user_data['mail'] = user.mail
        user_data['password'] = user.password
        user_data['status'] = user.status
        output.append(user_data)

    return jsonify({"users": output})


@app.route("/user/<public_id>", methods=['GET'])
def get_one_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': "no user found"})

    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['name'] = user.name
    user_data['mail'] = user.mail
    user_data['password'] = user.password
    user_data['status'] = user.status

    return jsonify({'user': user_data})


@app.route("/user", methods=['POST'])
def create_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data["password"], method='sha256')

    new_user = User(public_id=str(uuid.uuid4(
    )), name=data['name'], mail=data['mail'], password=hashed_password, status="member")
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':  'new user added !'})


@app.route("/user/<public_id>", methods=['PUT'])
def promote_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': "no user found"})

    user.status = "admin"
    db.session.commit()
    return jsonify({'message': 'user has been promoted'})


@app.route("/user/<public_id>", methods=['DELETE'])
def delete_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': "no user found"})

    db.session.delete(user)
    db.session.commit()

    return ({'message': 'user has been deleted'})


@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('could not verify', 401, {"WWW-Authenticate": 'basic realm="Login required!"'})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return make_response('could not verify', 401, {"WWW-Authenticate": 'basic realm="Login required!"'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id': user.public_id, "exp": datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])

        return jsonify({'token': token.decode('UTF_8')})

    return make_response('could not verify', 401, {"WWW-Authenticate": 'basic realm="Login required!"'})


if __name__ == "__main__":
    app.run(debug=True)
