import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {/* Ya code madhe me TabContent la everytime ek Tab component send kela aahe pn tho 
same ele same position ya rule mule every time TabContent madhe same ch state same ch rahnar*/}
      {/* {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )} */}

      {/* Aata ya code madhe mala me every time TabContent la unique key pass keli so key props ne 
      every ele sathi new state create keli */}
      {activeTab <= 2 ? (
        <TabContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }
  // 1.
  // In this video focus on this function :
  // ya madhe state hi patch update zali aahe so, means
  // A. Donhi value setter function madhe set zalya
  // B. UI upadte (commit) zala
  // C. state variable likes and showDetails chya value asynchronously behaviour mule aata step 3 la set zalya

  //Note:
  // A. Ithe undo mule 2 states update zalya pn nantar pn component ekda ch render hoto
  // B. ani jar state variable madhe ya default value already astil tar react state update karnar nahi
  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
  }

  // 2.
  function handleUndoLater() {
    // 2 sec nantr handleUndo la call kar
    setTimeout(handleUndo, 2000);
  }

  function handleTripleLike() {
    // // Intially likes 0 hota
    // setLikes(likes + 1);
    // // pn ithe pn likes 0 ch asnar karan state update (state variable update) asynchronously hote see the point 1
    // setLikes(likes + 1);
    // // pn ithe pn likes 0 ch asnar karan state update (state variable update) asynchronously hote see the point 1
    // setLikes(likes + 1);

    // Above 3 lines nantar pn state variable 1 che update honar

    // so, therefore below code madhe jevha pn state updation hot asel based on it's previous state
    // then, use the call back function
    // call function madhe me likes ha state variable aahe madhun thoch dyaycha ase kahi nahi me konta pn variable deu shakto
    // callback function mule mala updated state variable chi value bhetnar

    // Intially likes 0 hota
    setLikes((likes) => likes + 1);
    // ithe Intially likes 1 asnar
    setLikes((likes) => likes + 1);
    // ithe Intially likes 2 asnar
    setLikes((likes) => likes + 1);
    // ithe likes 3 asnar
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          {/* 3. mala below button var click kele ki 3 likes add karayche ahe directly */}
          {/* see the handleTripleLike in the above logic */}
          <button onClick={handleTripleLike}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        {/* 1. undo kar */}
        <button onClick={handleUndo}>Undo</button>
        {/* 2. ithe 2 sec nantar undo kar */}
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
