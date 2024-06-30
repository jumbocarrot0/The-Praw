import { Link } from "react-router-dom";

export default function WinLimitationPage() {
  return (
    <div>
      <h1 className='mb-4'>Win Limitation</h1>
      <p className="text-light">Win Limitation is a fan variant created by Jack Reda and Todd Etter.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      <p className="text-light">These rules are <Link to="http://warp.redamedia.com/winlimit.php">taken from the Warp</Link>, with some alterations for clarity.</p>
      <h3>Setup</h3>
      <ul>
        <li className="text-light">Place a Cosmic token on the "0" spot on the Warp's colony tracker.</li>
      </ul>
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">When the offense is one foreign colony away from winning, they may only invite a number of allies up to the number the token on the colony tracker is next to.</li>
        <li className="text-light">When the offense is one foreign colony away from winning, the defense may only invite a number of allies up to one more than the number the token on the colony tracker is next to.</li>
          <ul>
            <li className="text-light">So for example, if the offense has four foreign colonies and the token is on the "2", then the Offense may invite up to two allies and the defense may invite up to three.</li>
            <li className="text-light">If any effects make the number of foreign colonies needed to win unknown (e.g. Schizoid), just ignore these effects for the win limiation.</li>
          </ul>
        <li className="text-light">After the offense loses an encounter, if they are one foreign colony away from winning, advance the token on the colony tracker to the next space.</li>
        <li className="text-light">If the token is on the five space and should advance, instead discard it. There are now no limits on allies.</li>
      </ul>
    </div>
  );
}