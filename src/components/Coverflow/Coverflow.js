import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

import classes from "./Coverflow.css";
import axios from "../../axios-query";
import Aux from "../../hoc/Auxilary";
import Back from "./Back/Back";
import * as actionTypes from "../../Store/actions";

class Coverflow extends Component {
  state = {
    clicked: false,
    smaller: false,
    clickedBackId: null,
    middleItem: null,
    movement: 0,
    windowWidth: null,
    CoverFlowWidth: null,
    updated: false,
    elementInMiddle: null
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener("keydown", this.handleKeyboardEvent);
    this.scrollAnimation();
    this.updateDimensions();
  }

  componentWillUnmount = () => {
    window.removeEventListener("mousemove", this.scrollMiddleWare);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("keydown", this.handleKeyboardEvent);
    console.log("unmount");
  };

  handleKeyboardEvent = event => {
    const type = event.code;
    if (type === "Enter" || type === "ArrowDown") {
      this.getID(null, null, this.state.elementInMiddle);
    }
  };

  updateDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
    const items = document.getElementById("items");
    const itemsLength = items.children.length;

    if (itemsLength > 1 && itemsLength === this.props.imgArr.length) {
      //console.log('updated', items.children)
      const width = items.children[1].getBoundingClientRect().width;
      let sum = width * itemsLength;
      console.log(sum);
      this.setState({
        updated: true,
        CoverFlowWidth: sum
      });
      return;
    }
  };

  componentDidUpdate() {
    const items = document.getElementById("items");
    const itemsLength = items.children.length;

    if (
      itemsLength > 1 &&
      itemsLength === this.props.imgArr.length &&
      this.state.updated === false
    ) {
      //console.log('updated', items.children)
      const width = items.children[1].getBoundingClientRect().width;
      let sum = width * itemsLength;
      console.log(sum);
      this.setState({
        updated: true,
        CoverFlowWidth: sum
      });
      return;
    }
  }

  scrollAnimation() {
    const scrollable = document.getElementById("Coverflow");
    const items = document.getElementById("items");
    let itemsArr = [];
    Array.from(items.children).forEach(item => itemsArr.push(item));
    itemsArr.map(item => item);

    let delta = {
      x: null
    };
    let abs = {
      x: 0,
      y: 0
    };

    //Scroll Animation
    function scrollMiddleWare(inertia = 0.8) {
      return function onScroll(callback) {
        function notify() {
          abs.x += delta.x;
          callback({ abs, delta });
        }

        let requestId;

        function start() {
          requestId = requestAnimationFrame(update);
        }

        function update() {
          delta.x *= inertia;
          notify();
          start();
        }

        function stop() {
          cancelAnimationFrame(requestId);
          requestId = null;
        }

        let prevEvent;

        return function eventHandler(event) {
          event.preventDefault();
          //console.log(event)

          if ((prevEvent && event.buttons === 1) || event.type === "wheel") {
            let itemWidth = ~~itemsArr[0].offsetWidth;

            if (event.type !== "wheel") {
              delta.x = event.clientX - prevEvent.clientX;
              //console.log(delta.x)
            } else {
              //WHEEL EVENT
              delta.x =
                event.wheelDeltaY > 0 ? -itemWidth * 0.1 : +itemWidth * 0.1;
              //items.classList.add(classes.WheelAnimation)
              //console.log(delta.x)
            }

            stop();
            notify();
            //setTimeout(() => items.classList.remove(classes.WheelAnimation), 100)
          }

          if (prevEvent && event.type === "click") {
            items.classList.add(classes.DbClickAnimation);
            let scrollTo =
              abs.x -
              event.target.getBoundingClientRect().x +
              (window.innerWidth * 0.5 -
                event.target.getBoundingClientRect().width * 0.5);
            abs.x = scrollTo;
            stop();
            notify();
            setTimeout(
              () => items.classList.remove(classes.DbClickAnimation),
              600
            );
          }

          if (requestId === null && event.buttons === 0) {
            start();
          }
          prevEvent = event;
        };
      };
    }

    items.addEventListener(
      "click",

      scrollMiddleWare(0.25)(scroll => {
        const movement = ~~scroll.abs.x;
        this.setState((prevState, props) => ({
          movement
        }));
      })
    );

    scrollable.addEventListener(
      "wheel",
      scrollMiddleWare(0.89)(scroll => {
        const movement = ~~scroll.abs.x;

        this.setState((prevState, props) => ({
          movement
        }));
        //Scroll Border LEFT
        const { windowWidth, CoverFlowWidth } = this.state;
        if (movement > windowWidth * 0.5) {
          scroll.abs.x = windowWidth * 0.5 + 10;
          this.setState((prevState, props) => ({
            movement: windowWidth * 0.5 + 10
          }));
          return;
        }
        //Scroll Border Right
        //console.log(-movement, CoverFlowWidth)
        if (-movement > CoverFlowWidth) {
          scroll.abs.x = ~~-CoverFlowWidth;
          this.setState((prevState, props) => ({
            movement: ~~-CoverFlowWidth
          }));
          return;
        }
      })
    );

    scrollable.addEventListener(
      "mousemove",

      scrollMiddleWare()(scroll => {
        //console.log(abs.x, window.innerWidth)

        const movement = ~~scroll.abs.x;
        this.setState((prevState, props) => ({
          movement
        }));

        //Scroll Border Left
        const { windowWidth, CoverFlowWidth } = this.state;
        if (movement > windowWidth * 0.5) {
          scroll.abs.x = windowWidth * 0.5 + 10;
          this.setState((prevState, props) => ({
            movement: windowWidth * 0.5 + 10
          }));
          return;
        }
        //Scroll Border Right
        //console.log(-movement, CoverFlowWidth)
        if (-movement > CoverFlowWidth) {
          scroll.abs.x = ~~-CoverFlowWidth;
          this.setState((prevState, props) => ({
            movement: ~~-CoverFlowWidth
          }));
          return;
        }

        // CALC WINDOW PROS
        let WindowMiddle = window.innerWidth * 0.5;
        let itemWidth = ~~itemsArr[0].offsetWidth;
        let startRight = ~~WindowMiddle + itemWidth * 0.05;
        let endLeft = ~~WindowMiddle - itemWidth;
        let offset = ~~itemWidth * 0.2; //DELETE AFTER FLIPPER FIX

        //FILTER ELEMENTS TO LEFT RIGHT AND MIDDLE
        const MiddleItem = itemsArr.filter(items => {
          return (
            items.getBoundingClientRect().x <= startRight + 2 &&
            items.getBoundingClientRect().x >= endLeft - 2
          );
        });
        //CHECK IF THERE IS A MIDDLE ITEM
        if (MiddleItem.length > 0) {
          //CHECK IF THIS MIDDLEITEM IS UNEQUAL TO THE STATE MIDDLEITEM OF IF IT IS NULL
          //AND UPDATE THE STATE
          if (
            this.state.elementInMiddle === null ||
            this.state.elementInMiddle[0].outerHTML !== MiddleItem[0].outerHTML
          ) {
            this.setState({ elementInMiddle: MiddleItem });
            console.log("updating middle Item");
          }
        }

        let leftItems = itemsArr.filter(
          items => items.getBoundingClientRect().x < endLeft - offset
        );
        let rightItems = itemsArr.filter(
          items => items.getBoundingClientRect().x > startRight + offset
        );

        MiddleItem.map(MiddleItem => {
          //MIDDLE rotatey(0deg)//
          MiddleItem.style.zIndex = "100";

          MiddleItem.classList.remove(classes.Right);
          MiddleItem.classList.remove(classes.Left);
          MiddleItem.classList.add(classes.Middle); //ADD MIDDLE CLASS
        });

        leftItems.map((Leftitem, index) => {
          //LEFT rotatey(20deg)//

          const Zindex = 50 + (index + 2) * 1;

          Leftitem.style.zIndex = `${Zindex}`;

          Leftitem.classList.remove(classes.Middle);
          Leftitem.classList.remove(classes.Right);
          Leftitem.classList.add(classes.Left); //ADD LEFT CLASS

          if (
            Leftitem.children[0].classList.contains(classes.ClickedFront) &&
            Leftitem.children[1].classList.contains(classes.ClickedBack)
          ) {
            Leftitem.children[0].classList.remove(classes.ClickedFront);
            Leftitem.children[1].classList.remove(classes.ClickedBack);
            return;
          }
        });

        rightItems.map((Rightitem, index) => {
          //RIGHT rotateY(-20deg)//

          const Zindex = 50 - (index + 2) * 1;

          Rightitem.style.zIndex = `${Zindex}`;

          Rightitem.classList.remove(classes.Middle);
          Rightitem.classList.remove(classes.Left);
          Rightitem.classList.add(classes.Right); //ADD RIGHT CLASS

          if (
            Rightitem.children[0].classList.contains(classes.ClickedFront) &&
            Rightitem.children[1].classList.contains(classes.ClickedBack)
          ) {
            Rightitem.children[0].classList.remove(classes.ClickedFront);
            Rightitem.children[1].classList.remove(classes.ClickedBack);
            return;
          }
        });
      })
    );
  }

  getID = (e, passedID, ElementFromKeyboardEvent) => {
    //console.log(ReactDOM.findDOMNode(this).offsetWidth)
    //console.log(ReactDOM.findDOMNode(this.state.elementInMiddle[0]));
    //console.log(this.refs[`front_${id}`].classList)
    let id;
    let target;
    let backOfTarget;
    let parent;
    //GLOBAL CLICK WITH ENTER
    if (ElementFromKeyboardEvent) {
      target = ReactDOM.findDOMNode(this.state.elementInMiddle[0].firstChild);
      id = target.id;
      backOfTarget = target.nextSibling;
      parent = target.parentNode;
    }
    //CLICK WITH MOUSE
    if (!ElementFromKeyboardEvent && passedID) {
      target = e.currentTarget;
      id = passedID;
      backOfTarget = target.nextSibling;
      parent = target.parentNode;
    }

    if (parent === undefined) {
      return;
    }

    if (parent.classList.contains(classes.Middle) && target !== undefined) {
      if (!ElementFromKeyboardEvent) {
        e.preventDefault();
      }

      target.classList.add(classes.ClickedFront);
      backOfTarget.classList.add(classes.ClickedBack);

      this.props.selectedCoverID(id);

      axios
        .get("albums/" + id + "/tracks")
        .then(data => {
          return Promise.all(
            data.data.items.map(function(item) {
              return [
                {
                  number: item.track_number,
                  name: item.name,
                  duration: item.duration_ms,
                  uri: item.uri,
                  id: item.id
                }
              ];
            })
          );
        })

        .then(tracklist => this.props.selectedTracklist(tracklist));

      this.setState({ clicked: true, clickedBackId: id });
    } else {
      console.log("element not in middle");

      /*  let obj = this.refs
             var result = Object.keys(obj).map(function (key) {
                 return [obj[key]];
             });
 
             console.log(result.map((item, i) => item[0].classList.contains([classes.ClickedFront]))); */
    }
  };

  render() {
    let listElements = <li> no albums </li>;

    if (this.props.imgArr) {
      listElements = this.props.imgArr.map((image, index) => {
        let id = this.props.ids[index].id;

        return (
          <Aux key={index}>
            <li
              ref={`listItem_${id}`}
              className={classes.Flipper}
              style={{ zIndex: 50 - (index + 2) * 1 }}
            >
              <div
                className={classes.Front}
                id={id}
                onClick={e => {
                  this.getID(e, id);
                }}
              >
                <img
                  draggable={false}
                  className={classes.Image}
                  src={image}
                  alt=""
                />
                <p
                  className={classes.Description}
                  style={{ zIndex: 101 + index * -1 }}
                >
                  {this.props.ids[index].name}
                </p>
              </div>

              <Back>
                {id === this.state.clickedBackId
                  ? this.props.tracklistProp
                  : null}
              </Back>
            </li>
          </Aux>
        );
      });
    }

    return (
      <Aux>
        <div className={classes.Coverflow} id="Coverflow">
          <ul
            className={classes.Ul}
            id="items"
            style={{ left: `${this.state.movement}px` }}
          >
            {listElements}
          </ul>
        </div>
      </Aux>
    );
  }
}

const mapStatetoProps = state => {
  return {
    imgArr: state.imgArr,
    ids: state.ids
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectedCoverID: id =>
      dispatch({ type: actionTypes.SELECTED_COVER_ID, id: id }),
    selectedTracklist: selectedTracklist =>
      dispatch({
        type: actionTypes.SELECTED_TRACKLIST,
        selectedTracklist: selectedTracklist
      })
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Coverflow);
