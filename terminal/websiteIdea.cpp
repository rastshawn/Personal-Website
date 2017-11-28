#include <iostream>
#include <string>

using namespace std;
string user = "User@www.shawnrast.com:~$ ";


void display (string s) {
    cout << s;
}

void home() {
    for (int i = 0; i<30; i++) {
        cout << endl;
    }
    display(user + "ls");
    display("\n");
    display("home\tabout\tcontact\tprojects");
    display("\n");
    display(user);

    string input;
    getline(cin, input);

}

void about() {

}

void contact() {

}

int main() {
    home();
    return 0;
}
