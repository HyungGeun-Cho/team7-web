import "./App.css";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import MainPage from "./Component/MainPage/MainPage";
import SearchPage from "./Component/SearchPage/SearchPage";
import RecentPage from "./Component/RecentPage/RecentPage";
import WritePage from "./Component/WritePage/WritePage";
import ErrorPage from "./Component/ErrorPage/ErrorPage";
import PostPage from "./Component/PostPage/PostPage";
import RegisterPage from "./Component/RegisterPage/RegisterPage";
import LoginPage from "./Component/LoginPage/LoginPage";
import ProfilePage from "./Component/ProfilePage/ProfilePage";
import SettingPage from "./Component/SettingPage/SettingPage";

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/search" component={SearchPage} exact={true}/>
                <Route path="/recent" component={RecentPage} exact={true}/>
                <Route path="/write" component={WritePage} exact={true}/>
                <Route path="/error" component={ErrorPage} exact={true}/>
                <Route path="/@:userId" component={ProfilePage} exact={true}/>
                <Route path="/post/@:userId/:postUrl" component={PostPage} exact={true}/>
                <Route path="/register" component={RegisterPage} exact={true}/>
                <Route path="/email-login" component={LoginPage} exact={true}/>
                <Route path="/setting" component={SettingPage} exact={true}/>
                <Route path="/" component={MainPage} exact={true}/>
                <Redirect to="/"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
